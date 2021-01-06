import { all } from "redux-saga/effects";
import { logIn, signUp } from "./sagas/Login";
import { createProject, queryUserProject } from "./sagas/Project";

function* sagas() {
  yield all([logIn(), signUp(), queryUserProject(), createProject()]);
}

export default sagas;
