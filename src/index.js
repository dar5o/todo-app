import React from "react";
import ReactDOM from "react-dom";
import Settings from '../src/context/Settings'
import App from "./App.js";
import AuthProvider from '../src/context/Auth';

const Main = () => {
  return (
    <Settings>
        <AuthProvider>
      <App />
      </AuthProvider> 
    </Settings>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);