import Axios from "axios";
import { Global } from "global";
import { Action, Obj, Request } from "interfaces/common";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { notificationError, notificationSuccess } from "./common";

export const BASE_URI = "http://45.77.24.242/app/api/v1/";

export enum REQUEST_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export const configAxios = (
  url: string,
  method: REQUEST_METHOD,
  params?: Obj,
  baseURL?: string,
  accessToken?: boolean,
  data?: Obj
) => {
  return accessToken
    ? {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            Global.user.token
              ? Global.user.token
              : localStorage.getItem("accessToken")
          }`,
        },
        params,
        baseURL: baseURL ? baseURL : BASE_URI,
        data,
      }
    : {
        url,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        params,
        baseURL: baseURL ? baseURL : BASE_URI,
        data,
      };
};
export const query = async (
  url: string,
  method: REQUEST_METHOD,
  params?: Obj,
  baseURL?: string,
  accessToken?: boolean,
  data?: Obj
) => {
  const config = configAxios(url, method, params, baseURL, accessToken, data);
  return Axios(config);
};

export function* doQuery(
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  accessToken?: boolean,
  notification?: boolean,
  request?: Request<Obj>
) {
  let response;
  const configBaseUrl = () => {
    if (request?.baseUrl) {
      return request.baseUrl;
    } else return baseURL;
  };
  try {
    if (method === REQUEST_METHOD.GET) {
      response = yield query(
        url,
        method,
        request?.payload,
        configBaseUrl(),
        accessToken
      );
    } else {
      response = yield query(
        url,
        method,
        undefined,
        configBaseUrl(),
        accessToken,
        request?.payload
      );
    }
    if (response.status === 200) {
      if (notification) {
        yield notificationSuccess({ content: "Success" });
      }
      yield put({ type: request?.response?.success, payload: response });
    } else if (response.status === 201) {
      if (notification) {
        yield notificationSuccess({ content: "Success" });
      }
      yield put({ type: request?.response?.success, payload: response });
    } else {
      if (notification) {
        yield notificationError({ content: "Failure" });
      }
      yield put({ type: request?.response?.failure, payload: response });
    }
  } catch (error) {
    yield put({ type: request?.response?.failure, payload: error });
    yield notificationError({ content: error.message });

    console.log(error);
  }
}

export function* watchQuery(
  action: string,
  url: string,
  method: REQUEST_METHOD,
  baseURL?: string,
  accessToken?: boolean,
  notification?: boolean,
  mode?: "latest" | "every" | "throttle" | "debounce"
): Generator {
  if (mode == null) {
    if (method !== REQUEST_METHOD.GET) {
      mode = "latest";
    } else {
      mode = "every";
    }
  }
  switch (mode) {
    case "latest":
      yield takeLatest(
        action,
        doQuery,
        url,
        method,
        baseURL,
        accessToken,
        notification
      );
      break;
    case "every":
      yield takeEvery(
        action,
        doQuery,
        url,
        method,
        baseURL,
        accessToken,
        notification
      );
      break;
    default:
      break;
  }
}

export const handleRESTError = (response: Response) => {
  if (response.status !== 200) {
    throw {
      code: response.status,
      message: response.statusText,
    };
  }
  return response;
};

export const createReducer = (success: string, failure: string) => {
  return (state: Obj | null = null, action: Action<Obj>) => {
    switch (action.type) {
      case success:
        return { response: action.payload, success: true };
      case failure:
        return { response: action.payload, success: false };
      default:
        return state;
    }
  };
};
