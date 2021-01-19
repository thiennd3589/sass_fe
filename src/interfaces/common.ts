import { AnyAction } from "redux";
import { ToastOptions } from "react-toastify";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

export interface Obj {
  [key: string]: {} | undefined | null;
}

export interface Action<T> {
  type: string;
  payload: T;
  baseUrl?: string;
  showLoading?: boolean;
  hideLoading?: boolean;
  errorMessage?: string;
  errorCode?: string;
  isResponse?: boolean;
}

export interface Request<T> extends AnyAction {
  baseUrl?: string;
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

export interface Task {
  title?: string;
  stageId?: number;
  boardId?: number;
  campaignId?: number;
  position?: number;
  description?: string;
  dueDate?: string;
  assigneeIds?: string;
  completeStatus?: string;
  archiveStatus?: string;
  clientId?: string | number;
}

export interface Stage {
  title: string;
  boardId?: number;
  campaignId?: number;
  projectId?: number;
  position?: number;
  numOfTask?: number;
  clientId: string | number;
  id?: number;
  tasks: Task[];
  type?: "normal" | "add";
  disableMove?: boolean;
}

export interface DragStageItem {
  index: number;
  id: string;
  type: string;
}

export interface DragTaskItem {
  index: number;
  type: string;
  stageIndex: number;
}
