import { Obj } from "interfaces/common";
import { toast } from "react-toastify";

export const notificationSuccess = (params: Obj) => {
  toast.success(params.content, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notificationError = (params: Obj) => {
  toast.error(params.content, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

