import Header from "components/Header";
import StatusContainer from "components/StatusContainer";
import React from "react";
import "./styles.scss";

const Campaign = () => {
  return (
    <div className="Campaign">
      <Header disableLogo />
      <div className="Background"></div>
      <div className="Content">
        <StatusContainer />
      </div>
    </div>
  );
};

export default Campaign;
