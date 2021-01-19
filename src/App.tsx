import Sidebar from "components/Sidebar";
import { Global, SCREEN } from "global";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { queryUserInfo } from "redux-saga/global-actions";
import Account from "screens/Account";
import Campaign from "screens/Campaign";
import Login from "screens/Login";
import RoadMap from "screens/RoadMap";
import "./App.scss";

export const ScreenContext = React.createContext<any>(undefined);

const token = localStorage.getItem("sassToken");

const App = () => {
  const [, redraw] = useState({});
  const dispatch = useDispatch();
  const [screen, setScreen] = useState(SCREEN.ROADMAP);
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('alo')
      Global.isAuthenticated = true;
      Global.user.token = token;
      dispatch(queryUserInfo());
      redraw({});
    } else {
      localStorage.clear();
      Global.isAuthenticated = false;
      Global.user.token = null;
      redraw({});
    }
  }, [isAuthenticated]);

  const renderScreen = (name: string) => {
    switch (name) {
      case SCREEN.ROADMAP:
        return <RoadMap />;
      case SCREEN.CAMPAIGN:
        return <Campaign />;
      case SCREEN.ACCOUNT:
        return <Account />;
      default:
        return <RoadMap />;
    }
  };

  return (
    <ScreenContext.Provider value={[screen, setScreen, setIsAuthenticated]}>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Sidebar />
            {renderScreen(screen)}
          </>
        ) : (
          <Login />
        )}
      </div>
    </ScreenContext.Provider>
  );
};

export default App;
