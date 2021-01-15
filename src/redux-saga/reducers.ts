import { combineReducers } from "redux";
import { LogIn, SignUp } from "screens/Login/reducers";
import {
  CreateCampaignResult,
  CreateProjectResult,
  CurrentCampaign,
  CurrentProject,
  UserCampaign,
  UserProject,
} from "./global-reducers";

export const state = combineReducers({
  //Login
  loginResult: LogIn,
  signUpResult: SignUp,
  //Project
  userProject: UserProject,
  createProjectResult: CreateProjectResult,
  currentProject: CurrentProject,
  //Campaign
  createCamPaignResult: CreateCampaignResult,
  userCampaign: UserCampaign,
  currentCampaign: CurrentCampaign,
});

export type State = ReturnType<typeof state>;
