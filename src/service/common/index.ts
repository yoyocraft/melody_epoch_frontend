import { ElNotification } from "element-plus";

export const success = (message: string) => {
  ElNotification({
    title: "Success",
    message,
    type: "success",
  });
};
