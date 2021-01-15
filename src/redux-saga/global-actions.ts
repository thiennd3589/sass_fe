import { Obj } from "interfaces/common";
import {
  CREATE_CAMPAIGN,
  CREATE_PROJECT,
  QUERY_CAMPAIGN,
  QUERY_USER_PROJECT,
  SET_CURRENT_CAMPAIGN,
  SET_CURRENT_PROJECT,
} from "redux-saga/actions";
import {
  CREATE_CAMPAIGN_FAILURE,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  QUERY_CAMPAIGN_FAILURE,
  QUERY_CAMPAIGN_SUCCESS,
  QUERY_USER_PROJECT_FAILURE,
  QUERY_USER_PROJECT_SUCCESS,
} from "./global-reducers";

//PROJECT

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

export const setCurrentProject = (payload: Obj) => ({
  type: SET_CURRENT_PROJECT,
  payload,
});

//CAMPAIGN

export const createCampaign = (payload: Obj, baseUrl: string) => ({
  type: CREATE_CAMPAIGN,
  payload,
  baseUrl,
  response: {
    success: CREATE_CAMPAIGN_SUCCESS,
    failure: CREATE_CAMPAIGN_FAILURE,
  },
});

export const queryCampaign = (payload: Obj, baseUrl: string) => ({
  type: QUERY_CAMPAIGN,
  payload,
  baseUrl,
  response: {
    success: QUERY_CAMPAIGN_SUCCESS,
    failure: QUERY_CAMPAIGN_FAILURE,
  },
});

export const setCurrentCampaign = (payload: Obj) => ({
  type: SET_CURRENT_CAMPAIGN,
  payload,
});
