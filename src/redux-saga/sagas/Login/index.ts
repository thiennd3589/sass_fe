import { LOGIN, SIGN_UP } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils";

export function* signUp() {
  return yield watchQuery(
    SIGN_UP,
    "user/register",
    REQUEST_METHOD.POST,
    undefined,
    undefined,
    true
  );
}

export function* logIn() {
  return yield watchQuery(
    LOGIN,
    "user/login",
    REQUEST_METHOD.POST,
    undefined,
    undefined,
    true
  );
}
