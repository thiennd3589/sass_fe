import { createReducer } from "utils";

export const QUERY_USER_PROJECT_SUCCESS = "QUERY_USER_PROJECT_SUCCESS";
export const QUERY_USER_PROJECT_FAILURE = "QUERY_USER_PROJECT_FAILURE";

export const UserProject = createReducer(
  QUERY_USER_PROJECT_SUCCESS,
  QUERY_USER_PROJECT_FAILURE
);

export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export const CreateProjectResult = createReducer(
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE
);
