import { Obj } from "interfaces/common";
import { createReducer } from "utils";
import { SET_CURRENT_CAMPAIGN, SET_CURRENT_PROJECT } from "./actions";

//PROJECT

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

export const CurrentProject = (state: Obj = {}, action: Obj) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return (state = action.payload as Obj);
    default:
      return state;
  }
};

//CAMPAIGN

export const CREATE_CAMPAIGN_SUCCESS = "CREATE_CAMPAIGN_SUCCESS";
export const CREATE_CAMPAIGN_FAILURE = "CREATE_CAMPAIGN_SUCCESS";

export const CreateCampaignResult = createReducer(
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILURE
);

export const QUERY_CAMPAIGN_SUCCESS = "QUERY_CAMPAIGN_SUCCESS";
export const QUERY_CAMPAIGN_FAILURE = "QUERY_CAMPAIGN_FAILURE";

export const UserCampaign = createReducer(
  QUERY_CAMPAIGN_SUCCESS,
  QUERY_CAMPAIGN_FAILURE
);

export const CurrentCampaign = (state: Obj = {}, action: Obj) => {
  switch (action.type) {
    case SET_CURRENT_CAMPAIGN:
      return (state = action.payload as Obj);
    default:
      return state;
  }
};
