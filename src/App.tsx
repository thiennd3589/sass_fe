import Sidebar from "components/Sidebar";
import { Global } from "global";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { State } from "redux-saga/reducers";
import Login from "screens/Login";
import RoadMap from "screens/RoadMap";
import "./App.scss";

const App = () => {
  const [, redraw] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    Global.user.token = localStorage.getItem("sassToken");
    Global.isAuthenticated = Global.user.token ? true : false;
    redraw({});
  }, [Global.isAuthenticated]);
  return (
    <div className="App">
      {Global.isAuthenticated && <Sidebar menus={Global.menus} />}{" "}
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (Global.isAuthenticated) {
              return <RoadMap />;
            } else {
              return <Login />;
            }
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
