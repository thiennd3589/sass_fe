import React, { useEffect, useRef, useState } from "react";
import { Menu, Obj } from "interfaces/common";
import { Icon, Modal, SemanticICONS } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  createProject,
  queryCampaign,
  queryUserProject,
  setCurrentCampaign,
  setCurrentProject,
} from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import RoadMapModal from "./RoadMapModal";
import CampaignModal from "./CampaignModal";

interface SidebarProps {
  setScreen?: (name: string) => void;
}

interface MenuItemProps {
  text: string;
  icon: SemanticICONS;
  type: string;
  subMenus: Obj[];
  bg: string;
  count: number;

  setScreen?: (name: string) => void;
  onSubmit?: () => void;
}

interface MenuRef {
  text: string;
  value: string;
  icon: SemanticICONS;
  subMenus: Obj[];
  type: string;
  bg: string;
}

const MenuItem = (props: MenuItemProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [visibleSub, setVisibleSub] = useState(false);
  const {
    createProjectResult,
    currentProject,
    createCampaignResult,
    currentCampaign,
  } = useSelector(
    (state: State) => ({
      createProjectResult: state.createProjectResult,
      currentProject: state.currentProject,
      createCampaignResult: state.createCamPaignResult,
      currentCampaign: state.currentCampaign,
    }),
    shallowEqual
  );

  useEffect(() => {
    //Query Project after create project successfully
    if (createProjectResult && createProjectResult.success) {
      dispatch(queryUserProject({ page: 1, limit: 10 }));
    }
  }, [createProjectResult]);

  useEffect(() => {
    if (createCampaignResult && createCampaignResult.success) {
      dispatch(
        queryCampaign(
          { page: 1, limit: 10 },
          `http://45.77.24.242/app/api/v1/project/${currentProject.id}/`
        )
      );
    }
  }, [createCampaignResult]);

  useEffect(() => {}, [currentProject]);

  const addProject = (name: string, description: string) => {
    dispatch(createProject({ name, description, status: "ACTIVE" }));
  };

  const addCampaign = (campaign: Obj) => {
    const param = {
      ...campaign,
      status: "ACTIVE",
      startDate: "",
      endDate: "",
      projectId: currentProject.id,
    };
    dispatch(
      createCampaign(
        param,
        `http://45.77.24.242/app/api/v1/project/${currentProject.id}/`
      )
    );
  };

  const onClickSubMenu = (type: string, data: Obj) => {
    switch (type) {
      case "roadmap":
        dispatch(setCurrentProject(data));
        break;
      case "campaign":
        dispatch(setCurrentCampaign(data));
        break;
      default:
        break;
    }

    props.setScreen && props.setScreen(type);
  };

  const setActiveSubMenu = (type: string, id: string | number) => {
    switch (type) {
      case "roadmap":
        if (currentProject && currentProject.id === id) {
          return "Active";
        } else return "";
      case "campaign":
        if (currentCampaign && currentCampaign.id === id) {
          return "Active";
        } else return "";
      default:
        return "";
    }
  };

  const renderContent = (type: string) => {
    switch (type) {
      case "roadmap":
        return (
          <RoadMapModal setOpen={() => setOpen(false)} onSubmit={addProject} />
        );
      case "campaign":
        return (
          <CampaignModal
            setOpen={() => setOpen(false)}
            onSubmit={addCampaign}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="MenuItem">
      <div className="MenuTitle">
        <div className="Text">
          <Icon name={props.icon} />
          <span
            onClick={() => {
              setVisibleSub((prev) => !prev);
            }}
          >
            {props.text}
          </span>
          <div
            className="Count"
            style={{
              background: `linear-gradient(to right,${props.bg} 50%, rgba(255,255,255,1) 100%, rgba(0,212,255,1) 100%)`,
            }}
          >
            {props.count}
          </div>
        </div>
        <Modal
          dimmer
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <div className="AddButton">
              <Icon name="add" />
            </div>
          }
        >
          <Modal.Header>{props.text}</Modal.Header>
          <Modal.Content className="CampaignModal">
            {renderContent(props.type)}
          </Modal.Content>
        </Modal>
      </div>
      <div className="SubMenus">
        {visibleSub &&
          props.subMenus.map((sub, index) => (
            <span
              key={index}
              className={setActiveSubMenu(
                props.type,
                sub.id as number | string
              )}
              onClick={() => {
                onClickSubMenu(props.type, sub);
              }}
            >
              {sub.name}
            </span>
          ))}
      </div>
    </div>
  );
};

const Sidebar = (props: SidebarProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    allowSetCurrentProject: true,
    allowSetCurrentCampaign: true,
    redraw: {},
  });
  const { userProject, currentProject, userCampaign } = useSelector(
    (state: State) => ({
      userProject: state.userProject,
      userCampaign: state.userCampaign,
      currentProject: state.currentProject,
    }),
    shallowEqual
  );
  const menuRef = useRef<MenuRef[]>([
    {
      text: "Road Map",
      value: "rm",
      icon: "sitemap",
      subMenus: [],
      type: "roadmap",
      bg: "#EA2D28",
    },
    {
      text: "Campaign",
      value: "cp",
      icon: "road",
      subMenus: [],
      type: "campaign",
      bg: "#0BB5A8",
    },
    {
      text: "Ads Report",
      value: "ar ",
      icon: "audio description",
      subMenus: [],
      type: "report",
      bg: "#F28840",
    },
  ]);

  useEffect(() => {
    dispatch(queryUserProject({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    if (currentProject.id) {
      dispatch(
        queryCampaign(
          { page: 1, limit: 10 },
          `http://45.77.24.242/app/api/v1/project/${currentProject.id}/`
        )
      );
    }
  }, [currentProject]);

  useEffect(() => {
    if (userProject) {
      if (userProject.success) {
        const userProjectData = (userProject.response as Obj).data as Obj[];
        menuRef.current[0].subMenus = userProjectData;
        state.allowSetCurrentProject &&
          dispatch(setCurrentProject(userProjectData[0]));
      }
      setState((prev) => ({
        ...prev,
        redraw: {},
        allowSetCurrentProject: false,
      }));
    }

    if (userCampaign) {
      if (userCampaign.success) {
        const userCampaignData = (userCampaign.response as Obj).data as Obj[];
        menuRef.current[1].subMenus = userCampaignData;
        state.allowSetCurrentCampaign &&
          dispatch(setCurrentCampaign(userCampaignData[0]));
      }
      setState((prev) => ({
        ...prev,
        redraw: {},
        allowSetCurrentCampaign: false,
      }));
    }
  }, [userProject, userCampaign]);

  useEffect(() => {
    console.log(userCampaign);
  }, [userCampaign]);

  return (
    <div className="Sidebar">
      <div className="Brand" onClick={() => history.push("/")}>
        <span>SASS DASHBOARD</span>
      </div>
      <div className="Menu">
        {menuRef.current.map((item, index) => (
          <MenuItem
            {...item}
            count={item.subMenus.length}
            setScreen={props.setScreen}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
