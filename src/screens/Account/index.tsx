import Header from "components/Header";
import UserManage from "components/UserManage";
import { Tab } from "semantic-ui-react";
import "./styles.scss";

const panes = [
  {
    menuItem: "Tab 1",
    render: () => (
      <Tab.Pane>
        <UserManage />
      </Tab.Pane>
    ),
  },
  { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
];

const Account = () => {
  return (
    <div className="Account">
      <Header disableLogo />
      <div className="Background"></div>
      <div className="Content">
        <Tab panes={panes} />
      </div>
    </div>
  );
};

export default Account;
