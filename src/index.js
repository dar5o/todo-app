import React from "react";
import ReactDOM from "react-dom";
import Settings from '../src/context/Settings'
import App from "./App.js";

const Main = () => {
  return (
    <Settings>
      <App />
    </Settings>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);