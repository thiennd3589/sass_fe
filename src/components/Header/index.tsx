import React, { useState } from "react";
import { Icon, Menu, Popup } from "semantic-ui-react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./styles.scss";
import { Global } from "../../global";

interface HeaderProps {
  disableLogo?: boolean;
}

const Header = (props: HeaderProps) => {
  const location = useLocation();
  const history = useHistory();
  const [, redraw] = useState({});

  const onLogout = () => {
    localStorage.clear();
    Global.user.token = null;
    Global.isAuthenticated = false;
    history.push("/");
    redraw({});
  };

  return (
    <div className="Header">
      <div className={`Container ${props.disableLogo ? "DisabledLogo" : ""}`}>
        {props.disableLogo ? null : (
          <div className="LogoSection">
            <Link to="/">
              <span>Sass</span>
            </Link>
          </div>
        )}
        <div className="Menu">
          <Menu secondary>
            <Menu.Item name="Create Event">
              <Icon name="bell" />
            </Menu.Item>

            {Global.user.token && (
              <Menu.Item>
                <Popup trigger={<Icon name="user" />} on="click">
                  <Popup.Header>Account</Popup.Header>
                  <Popup.Content className="AccountManage">
                    <div onClick={onLogout}>Log Out</div>
                  </Popup.Content>
                </Popup>
              </Menu.Item>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
