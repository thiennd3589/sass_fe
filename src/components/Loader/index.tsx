import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default () => {
  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
};
