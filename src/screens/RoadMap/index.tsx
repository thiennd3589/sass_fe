import Timeline from "components/Timeline";
import CustomButton from "element/Button";
import DateTimePicker from "element/DateTimePicker";
import { Obj } from "interfaces/common";
import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import "./styles.scss";

interface RoadMapProps {}

interface CampaignItemProps {
  name: string;
  onDateChange?: (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => void;
  onSubmit?: (name: string) => void;
}

interface RoadMapState {
  timelineData: Obj[];
  openModal: boolean;
  campaign: {
    name: string;
    start: string;
    end: string;
    y: number;
  };
}

const fakeData = [
  { name: "Campaign 1" },
  { name: "Campaign 2" },
  { name: "Campaign 3" },
  { name: "Campaign 4" },
  { name: "Campaign 5" },
  { name: "Campaign 6" },
];

const CampaignItem = (props: CampaignItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      dimmer
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<div className="Campaign">{props.name}</div>}
    >
      <Modal.Header>{props.name}</Modal.Header>
      <Modal.Content className="CampaignModal">
        <span>Set schedule for campaign</span>
        <div className="DatePicker">
          <DateTimePicker
            label="Start Date"
            onChange={(e, data) => {
              props.onDateChange && props.onDateChange(e, data, "start");
            }}
          />
          <DateTimePicker
            label="End Date"
            onChange={(e, data) => {
              props.onDateChange && props.onDateChange(e, data, "end");
            }}
          />
        </div>
      </Modal.Content>
      <Modal.Actions className="Submit">
        <CustomButton
          text="Cancel"
          onClick={() => {
            setOpen(false);
          }}
        />
        <CustomButton
          text="Submit"
          onClick={() => {
            props.onSubmit && props.onSubmit(props.name);
            setOpen(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

const RoadMap = (props: RoadMapProps) => {
  const [state, setState] = useState<RoadMapState>({
    timelineData: [],
    openModal: false,
    campaign: {
      name: "",
      start: "",
      end: "",
      y: 0,
    },
  });

  const [campaignList, setCampaignList] = useState(fakeData);

  const onDateChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => {
    const date = (data.value as string).split("-");
    const dateData = new Date(
      parseInt(date[2]),
      parseInt(date[1]) - 1,
      parseInt(date[0]) + 1
    );
    dateData.setUTCHours(0);
    dateData.setUTCMinutes(0);
    dateData.setUTCSeconds(0);
    dateData.setUTCMilliseconds(0);

    setState((prev) => ({
      ...prev,
      campaign: {
        ...prev.campaign,
        [name]: dateData.getTime(),
      },
    }));
  };

  const onRemoveCampaign = (name: string) => {
    setState((prev) => ({
      ...prev,
      timelineData: prev.timelineData.filter(
        (campaign) => campaign.name !== name
      ),
    }));
  };

  const onSubmit = (name: string) => {
    const data = {
      ...state.campaign,
      name,
    };

    if (data.start > data.end) {
      alert("Ngày kết thúc nhỏ hơn ngày bắt đầu!");
    } else {
      setState((prev) => ({
        ...prev,
        timelineData: prev.timelineData.concat([data]),
        openModal: false,
      }));
    }
  };

  return (
    <div className="RoadMap">
      <div className="CampaignList">
        {campaignList.map((campaign, index) => (
          <CampaignItem
            key={index}
            name={campaign.name}
            onDateChange={onDateChange}
            onSubmit={onSubmit}
          />
        ))}
      </div>
      <Timeline data={state.timelineData} onRemove={onRemoveCampaign} />
    </div>
  );
};

export default RoadMap;
