import "@blueprintjs/core/lib/css/blueprint.css";
import ToDo from "./components/todo/todo";
import Settings from "../src/context/Settings";
import Auth from "../src/components/auth/isAuthorized";
import Login from "../src/components/auth/login";

const App = () => {
  return (
  <>
    <Login />
      <Auth capability="read">
        <Settings>
          <ToDo />
        </Settings>
      </Auth>
  </>
  );
};

export default App;