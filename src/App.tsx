import Sidebar from "components/Sidebar";
import { Global } from "global";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { State } from "redux-saga/reducers";
import Campaign from "screens/Campaign";
import Login from "screens/Login";
import RoadMap from "screens/RoadMap";
import "./App.scss";

const App = () => {
  const [, redraw] = useState({});
  const [screen, setScreen] = useState("roadmap");
  useEffect(() => {
    Global.user.token = localStorage.getItem("sassToken");
    Global.isAuthenticated = Global.user.token ? true : false;
    redraw({});
  }, [Global.isAuthenticated]);

  const renderScreen = (name: string) => {
    switch (name) {
      case "roadmap":
        return <RoadMap />;
      case "campaign":
        return <Campaign />;
      default:
        return <RoadMap />;
    }
  };

  return (
    <div className="App">
      {Global.isAuthenticated ? (
        <>
          <Sidebar setScreen={(screen) => setScreen(screen)} />
          {renderScreen(screen)}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
