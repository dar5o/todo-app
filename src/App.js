import "@blueprintjs/core/lib/css/blueprint.css";
import ToDo from "./components/todo/todo";
import Settings from "../src/context/Settings";

const App = () => {
  return (
    <>
      <Settings>
        <ToDo />
      </Settings>
    </>
  );
};

export default App;