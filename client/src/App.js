import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cloud from "./Components/Cloud/Cloud";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/cloud" render={() => <Cloud />} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
