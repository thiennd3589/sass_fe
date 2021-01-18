import Sidebar from "components/Sidebar";
import { Global, SCREEN } from "global";
import React, { useEffect, useState } from "react";
import Campaign from "screens/Campaign";
import Login from "screens/Login";
import RoadMap from "screens/RoadMap";
import "./App.scss";

export const ScreenContext = React.createContext<any>(undefined);

const App = () => {
  const [, redraw] = useState({});
  const [screen, setScreen] = useState(SCREEN.ROADMAP);
  useEffect(() => {
    Global.user.token = localStorage.getItem("sassToken");
    Global.isAuthenticated = Global.user.token ? true : false;
    redraw({});
  }, [Global.isAuthenticated]);

  const renderScreen = (name: string) => {
    switch (name) {
      case SCREEN.ROADMAP:
        return <RoadMap />;
      case SCREEN.CAMPAIGN:
        return <Campaign />;
      default:
        return <RoadMap />;
    }
  };

  return (
    <ScreenContext.Provider value={[screen, setScreen]}>
      <div className="App">
        {Global.isAuthenticated ? (
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
