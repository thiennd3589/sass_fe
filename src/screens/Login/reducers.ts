import { create } from "domain";
import { createReducer } from "utils";

export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LogIn = createReducer(LOG_IN_SUCCESS, LOG_IN_FAILURE);

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SignUp = createReducer(SIGN_UP_SUCCESS, SIGN_UP_FAILURE);
