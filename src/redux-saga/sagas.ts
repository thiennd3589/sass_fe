import { all } from "redux-saga/effects";
import { createCampaign, queryUserCampaign } from "./sagas/Campaign";
import { logIn, signUp } from "./sagas/Login";
import { createProject, queryUserProject } from "./sagas/Project";

function* sagas() {
  yield all([
    logIn(),
    signUp(),
    queryUserProject(),
    createProject(),
    createCampaign(),
    queryUserCampaign(),
  ]);
}

export default sagas;
