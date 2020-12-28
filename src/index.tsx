import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import store from "redux-saga/store";
import App from "./App";
import "./index.css";

//notification
toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
