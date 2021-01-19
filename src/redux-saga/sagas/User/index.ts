import { QUERY_USER_INFO } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils";

export function* queryUserInfo() {
  return yield watchQuery(
    QUERY_USER_INFO,
    "user/info",
    REQUEST_METHOD.GET,
    undefined,
    true
  );
}
