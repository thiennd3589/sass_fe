import { combineReducers } from "redux";
import { LogIn, SignUp } from "screens/Login/reducers";
import { CreateProjectResult, UserProject } from "./global-reducers";

export const state = combineReducers({
  loginResult: LogIn,
  signUpResult: SignUp,
  userProject: UserProject,
  createProjectResult: CreateProjectResult,
});

export type State = ReturnType<typeof state>;
