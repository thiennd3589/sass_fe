import React from "react";
import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react";

const Loader = () => {
  return (
    <Dimmer active>
      <SemanticLoader />
    </Dimmer>
  );
};

export default Loader;
