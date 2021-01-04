import { AnyAction } from "redux";
import { ToastOptions } from "react-toastify";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

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

export interface Menu {
  icon?: SemanticICONS;
  title: string;
  route?: string;
  subMenu?: Menu[];
}
