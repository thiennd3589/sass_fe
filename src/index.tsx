import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ScrollToTop from "components/ScrollTop";
import App from "./App";
import store from "redux-saga/store";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";

//notification
toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <DndProvider backend={HTML5Backend}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </DndProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
