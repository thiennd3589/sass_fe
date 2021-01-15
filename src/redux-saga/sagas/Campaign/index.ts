import { CREATE_CAMPAIGN, QUERY_CAMPAIGN } from "redux-saga/actions";
import { REQUEST_METHOD, watchQuery } from "utils";

export function* createCampaign() {
  return yield watchQuery(
    CREATE_CAMPAIGN,
    "campaign",
    REQUEST_METHOD.POST,
    undefined,
    true,
    true
  );
}

export function* queryUserCampaign() {
  return yield watchQuery(
    QUERY_CAMPAIGN,
    "campaign/createdbyme",
    REQUEST_METHOD.GET,
    undefined,
    true
  );
}
