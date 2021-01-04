import React, { useRef } from "react";
import { Menu } from "interfaces/common";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./styles.scss";

interface SidebarProps {
  menus: Menu[];
  eventName?: string;
  eventTime?: string;
  active?: string;
}

interface MenuRef {
  text: string;
  value: string;
  icon: SemanticICONS;
  subMenus: { text: string; value: string }[];
}

const Sidebar = (props: SidebarProps) => {
  const menuRef = useRef<MenuRef[]>([
    { text: "Road Map", value: "rm", icon: "sitemap", subMenus: [] },
    { text: "Campaign", value: "cp", icon: "road", subMenus: [] },
    { text: "Ads Report", value: "ar ", icon: "audio description", subMenus: [] },
  ]);
  const history = useHistory();

  return (
    <div className="Sidebar">
      <div className="Brand" onClick={() => history.push("/")}>
        <span>SASS DASHBOARD</span>
      </div>
      <div className="Menu">
        {menuRef.current.map((item, index) => (
          <div className="MenuItem" key={index}>
            <div className="MenuTitle">
              <div className="Text">
                <Icon name={item.icon} />
                <span>{item.text}</span>
              </div>
              <div className="AddButton">
                <Icon name="add" />
              </div>
            </div>
            <div className="SubMenu"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
