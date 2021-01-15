import CustomButton from "element/Button";
import DateTimePicker from "element/DateTimePicker";
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
    // startDate: "",
    // endDate: "",
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

  // const onDateChange = (
  //   e: React.SyntheticEvent<HTMLElement, Event>,
  //   data: any,
  //   name: string
  // ) => {
  //   const date = (data.value as string).split("-");
  //   const dateData = new Date(
  //     parseInt(date[2]),
  //     parseInt(date[1]) - 1,
  //     parseInt(date[0]) + 1
  //   );
  //   dateData.setUTCHours(0);
  //   dateData.setUTCMinutes(0);
  //   dateData.setUTCSeconds(0);
  //   dateData.setUTCMilliseconds(0);

  //   setState((prev) => ({
  //     ...prev,
  //     [name]: dateData.getTime(),
  //   }));
  // };

  return (
    <div className="CampaignModal">
      <TextBox
        label="Tên chiến dịch"
        name="name"
        value={state.name.value}
        placeholder="SEO Advertise"
        onChange={onChange}
      />
      {/* 
      <div className="DateTime">
        <DateTimePicker
          label="Ngày bắt đầu"
          onChange={(e, data) => {
            onDateChange(e, data, "startDate");
          }}
        />
        <DateTimePicker
          label="Ngày kết thúc"
          onChange={(e, data) => {
            onDateChange(e, data, "endDate");
          }}
        />
      </div> */}
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
                // startDate: state.startDate,
                // endDate: state.endDate,
              });
            props.setOpen();
          }}
        />
      </div>
    </div>
  );
};

export default CampaignModal;
