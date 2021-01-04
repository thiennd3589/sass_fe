import Sidebar from "components/Sidebar";
import { Global } from "global";
import React from "react";
import { Switch, Route } from "react-router-dom";
import RoadMap from "screens/RoadMap";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Sidebar menus={Global.menus} />
      <Switch>
        <Route exact path="/" render={() => <RoadMap />} />
      </Switch>
    </div>
  );
};

export default App;
