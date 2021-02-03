import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import Header from "components/Header";
import Timeline from "components/Timeline";
import CustomButton from "element/Button";
import DateTimePicker from "element/DateTimePicker";
import { State } from "redux-saga/reducers";
import { Obj } from "interfaces/common";
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
    timelineData: [
      {
        name: "Example Events",
        start: new Date().getTime(),
        end: new Date().getTime() + 1000000000,
        y: 0,
      },
      {
        name: "Example Events",
        start: new Date().getTime() + 1500000000,
        end: new Date().getTime() + 4000000000,
        y: 1,
      },
      {
        name: "Example Events",
        start: new Date().getTime() + 3000000000,
        end: new Date().getTime() + 5000000000,
        y: 2,
      },
    ],
    openModal: false,
    campaign: {
      name: "",
      start: "",
      end: "",
      y: 0,
    },
  });

  const { userCampaign } = useSelector(
    (state: State) => ({
      userCampaign: state.userCampaign,
    }),
    shallowEqual
  );

  const [campaignList, setCampaignList] = useState<Obj[]>([]);

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

  useEffect(() => {
    if (userCampaign) {
      console.log(userCampaign)
      if (userCampaign.success) {
        setCampaignList(((userCampaign.response as Obj).data as Obj).data as Obj[]);
      }
    }
  }, [userCampaign]);

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

  console.log(campaignList)

  return (
    <div className="RoadMap">
      <Header disableLogo />
      <div className="Background"></div>
      <div className="Content">
        <div className="CampaignList">
          <div className="Title">Danh sách chiến dịch</div>
          <div className="CampaignContainer">
            {campaignList.map((campaign, index) => (
              <CampaignItem
                key={index}
                name={campaign.name as string}
                onDateChange={onDateChange}
                onSubmit={onSubmit}
              />
            ))}
          </div>
        </div>
        <Timeline
          data={state.timelineData}
          onRemove={onRemoveCampaign}
          // height={state.timelineData.length * 80 + 100}
        />
      </div>
    </div>
  );
};

export default RoadMap;
