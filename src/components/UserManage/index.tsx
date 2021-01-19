import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import "./styles.scss";

const UserManage = () => {
  const userInfo = useSelector((state: State) => state.userInfo);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return <div className="UserManage"></div>;
};

export default UserManage;
