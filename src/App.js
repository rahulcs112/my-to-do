import logo from "./logo.svg";
import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import EditTask from "./components/EditTask";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit/:id" component={EditTask} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
