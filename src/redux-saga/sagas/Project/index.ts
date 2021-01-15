import { QUERY_USER_PROJECT, CREATE_PROJECT } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils";

export function* createProject() {
  return yield watchQuery(
    CREATE_PROJECT,
    "project",
    REQUEST_METHOD.POST,
    undefined,
    true,
    true
  );
}

export function* queryUserProject() {
  return yield watchQuery(
    QUERY_USER_PROJECT,
    "project/createdbyme",
    REQUEST_METHOD.GET,
    undefined,
    true
  );
}

