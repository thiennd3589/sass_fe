import { Obj } from "interfaces/common";
import { CREATE_PROJECT, QUERY_USER_PROJECT } from "redux-saga/actions";
import {
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  QUERY_USER_PROJECT_FAILURE,
  QUERY_USER_PROJECT_SUCCESS,
} from "./global-reducers";

export const queryUserProject = (payload: Obj) => {
  return {
    type: QUERY_USER_PROJECT,
    payload,
    response: {
      success: QUERY_USER_PROJECT_SUCCESS,
      failure: QUERY_USER_PROJECT_FAILURE,
    },
  };
};

export const createProject = (payload: Obj) => ({
  type: CREATE_PROJECT,
  payload,
  response: {
    success: CREATE_PROJECT_SUCCESS,
    failure: CREATE_PROJECT_FAILURE,
  },
});
