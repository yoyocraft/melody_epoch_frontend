import { ElNotification } from "element-plus";

export const success = (message: string) => {
  ElNotification({
    title: "Success",
    message,
    type: "success",
  });
};

export const error = (message: string) => {
  ElNotification({
    title: "Error",
    message,
    type: "error",
  });
};
