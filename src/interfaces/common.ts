import { AnyAction } from "redux";
import { ToastOptions } from "react-toastify";


export interface Obj {
  [key: string]: {} | undefined | null;
}

export interface Action<T> {
  type: string;
  payload: T;
  showLoading?: boolean;
  hideLoading?: boolean;
  errorMessage?: string;
  errorCode?: string;
  isResponse?: boolean;
}

export interface Request<T> extends AnyAction {
  response?: { success: string; failure: string };
  payload?: T;
  showNotification?: boolean;
  notification?: ToastOptions;
}
