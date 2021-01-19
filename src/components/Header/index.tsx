import React, { useState, useContext } from "react";
import { Divider, Icon, Menu, Popup } from "semantic-ui-react";
import { ScreenContext } from "App";
import { Link, useHistory } from "react-router-dom";
import { Global, SCREEN } from "../../global";
import "./styles.scss";

interface HeaderProps {
  disableLogo?: boolean;
}

const Header = (props: HeaderProps) => {
  const history = useHistory();
  const [, setScreen,setIsAuthenticated] = useContext(ScreenContext);

  const onLogout = () => {
    setIsAuthenticated(false);
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
                  <Popup.Header>Tài khoản</Popup.Header>
                  <Divider />
                  <Popup.Content className="AccountManage">
                    <div onClick={onLogout}>Đăng xuất</div>
                    <div
                      onClick={() => {
                        setScreen(SCREEN.ACCOUNT);
                      }}
                    >
                      Quản lý tài khoản
                    </div>
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
