import { Obj } from "interfaces/common";
import { LOGIN, SIGN_UP } from "redux-saga/actions";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "./reducers";

export const logIn = (payload: Obj) => ({
  type: LOGIN,
  payload,
  response: {
    success: LOG_IN_SUCCESS,
    failure: LOG_IN_FAILURE,
  },
});

export const signUp = (payload: Obj) => ({
  type: SIGN_UP,
  payload,
  response: {
    success: SIGN_UP_SUCCESS,
    failure: SIGN_UP_FAILURE,
  },
});
