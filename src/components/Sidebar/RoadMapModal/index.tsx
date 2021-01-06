import CustomButton from "element/Button";
import TextBox from "element/TextBox";
import React, { useState } from "react";
import "./styles.scss";

interface RoadMapModalProps {
  onSubmit?: (name: string, description: string) => void;
  setOpen: () => void;
}

const RoadMapModal = (props: RoadMapModalProps) => {
  const [state, setState] = useState({
    name: {
      value: "",
      errorMessage: "",
      showError: false,
    },
    description: {
      value: "",
      errorMessage: "",
      showError: false,
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        showError: false,
        errorMessage: "",
      },
    }));
  };

  return (
    <div className="RoadMapModal">
      <TextBox
        label="Project Name"
        name="name"
        value={state.name.value}
        placeholder="Type your project name"
        onChange={onChange}
      />
      <TextBox
        label="Description"
        name="description"
        value={state.description.value}
        placeholder="Describe your project"
        onChange={onChange}
      />

      <div className="Submit">
        <CustomButton
          text="Cancel"
          onClick={() => {
            props.setOpen();
          }}
        />
        <CustomButton
          text="Submit"
          onClick={() => {
            props.onSubmit &&
              props.onSubmit(state.name.value, state.description.value);
            props.setOpen();
          }}
        />
      </div>
    </div>
  );
};

export default RoadMapModal;
