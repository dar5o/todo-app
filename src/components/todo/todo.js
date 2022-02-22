import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { Switch, Card, Elevation, Button} from "@blueprintjs/core";
import { v4 as uuid } from "uuid";
import { SettingsContext } from "../../context/Settings";

const ToDo = () => {
  const contextSettings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(contextSettings.displayItems);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  const pagination = () => {
    let tasksShown = list.slice(startIndex, endIndex);

    return tasksShown;
  };

  const changePagination = (e) => {
    e.preventDefault();

    contextSettings.setDisplayItems(e.target.value);
  }

  const handlePrevious = (e) => {
    e.preventDefault();

    setStartIndex(startIndex - contextSettings.displayItems);
    setEndIndex(endIndex - contextSettings.displayItems);
  };

  const handleNext = (e) => {
    e.preventDefault();

    setStartIndex(startIndex + contextSettings.displayItems);
    setEndIndex(endIndex + contextSettings.displayItems);
  };

  const handleHideItem = (e) => {
    e.preventDefault();
    contextSettings.setHide(!contextSettings.hide);
  };

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <Card interactive={true} elevation={Elevation.THREE}>
        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input
              onChange={handleChange}
              name="text"
              type="text"
              placeholder="Item Details"
            />
          </label>

          <label>
            <span>Assigned To</span>
            <input
              onChange={handleChange}
              name="assignee"
              type="text"
              placeholder="Item Name"
            />
          </label>

          <label>
            <span>Difficulty</span>
            <input
              onChange={handleChange}
              defaultValue={3}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </label>

          <label>
            <Button type="submit" intent="success" text="Add Item" />
          </label>

        <label>
          <Switch onChange={handleHideItem}>Slide to hide completed tasks</Switch>
          </label>

          <label>
            <p>1&#8592; Tasks shown &#8594;5</p>
            <input onChange={changePagination} defaultValue={3} type="range" min={1} max={5} name="tasksShown"></input>
          </label>
        </form>
      </Card>
      
      {pagination().map((item, index) => {
        if (contextSettings.hide === false || item.complete === false) {
          return <Card key={index} interactive={true} elevation={Elevation.ONE}>
            <h2>{item.assignee}</h2>
            <hr />
            <h3>{item.text}</h3>
            <h4>Difficulty: {item.difficulty}</h4>
            <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
            <label>
            <Button intent="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
            <hr />
            </label>
            </Card>
        }
      })
    }
    <Button onClick={handlePrevious} intent="success" text="Previous" />
    <Button onClick={handleNext} rightIcon="arrow-right" intent="success" text="Next"/>
    </>
  );
};

export default ToDo;