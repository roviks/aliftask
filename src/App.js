import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import "./assets/fonts/icons/icons.css";
import "./assets/fonts/webfonts/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./Pages/User.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/user/:id" exact>
          <User />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
