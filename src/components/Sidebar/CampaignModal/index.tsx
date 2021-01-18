import CustomButton from "element/Button";
import TextBox from "element/TextBox";
import { Obj } from "interfaces/common";
import React, { useState } from "react";
import "./styles.scss";

interface CampaignModalProps {
  onSubmit?: (campaign: Obj) => void;
  setOpen: () => void;
}

const CampaignModal = (props: CampaignModalProps) => {
  const [state, setState] = useState({
    name: {
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
    <div className="CampaignModal">
      <TextBox
        label="Tên chiến dịch"
        name="name"
        value={state.name.value}
        placeholder="SEO Advertise"
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
              props.onSubmit({
                name: state.name.value,
              });
            props.setOpen();
          }}
        />
      </div>
    </div>
  );
};

export default CampaignModal;
