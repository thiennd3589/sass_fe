import React, { useEffect, useRef, useState } from "react";
import { Menu, Obj } from "interfaces/common";
import { Icon, Modal, SemanticICONS } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createProject, queryUserProject } from "redux-saga/global-actions";
import { State } from "redux-saga/reducers";
import CustomButton from "element/Button";
import TextBox from "element/TextBox";
import RoadMapModal from "./RoadMapModal";

interface SidebarProps {
  menus: Menu[];
  eventName?: string;
  eventTime?: string;
  active?: string;
}

interface MenuItemProps {
  text: string;
  icon: SemanticICONS;
  type: string;
  subMenus: Obj[];
  bg: string;
  count: number;

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
  const { createProjectResult } = useSelector(
    (state: State) => ({
      createProjectResult: state.createProjectResult,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (createProjectResult && createProjectResult.success) {
      dispatch(queryUserProject({ page: 1, limit: 10 }));
    }
  }, [createProjectResult]);

  const addProject = (name: string, description: string) => {
    dispatch(createProject({ name, description, status: "ACTIVE" }));
  };

  const renderContent = (type: string) => {
    switch (type) {
      case "roadmap":
        return (
          <RoadMapModal setOpen={() => setOpen(false)} onSubmit={addProject} />
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
          <span>{props.text}</span>
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
        {props.subMenus.map((sub, index) => (
          <span key={index}>{sub.name}</span>
        ))}
      </div>
    </div>
  );
};

const Sidebar = (props: SidebarProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({ redraw: {} });
  const { userProject } = useSelector(
    (state: State) => ({ userProject: state.userProject }),
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
    console.log(userProject);

    if (userProject) {
      if (userProject.success) {
        menuRef.current[0].subMenus = (userProject.response as Obj)
          .data as Obj[];
      }
      setState((prev) => ({ ...prev, redraw: {} }));
    }
  }, [userProject]);

  return (
    <div className="Sidebar">
      <div className="Brand" onClick={() => history.push("/")}>
        <span>SASS DASHBOARD</span>
      </div>
      <div className="Menu">
        {menuRef.current.map((item, index) => (
          <MenuItem {...item} count={item.subMenus.length} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
