import http from "../../plugins/http";
import {
  AccLoginParams,
  AccRegisterParams,
  EmailLoginParams,
  EmailRegisterParams,
} from "../../model/user";

/**
 * 获取邮箱验证码
 * @param email
 * @returns
 */
export const getCaptcha = async (email: string) => {
  const res = await http.get("/email/captcha", {
    params: {
      email,
    },
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 账号登录
 */
export const accLogin = async (accLoginParams: AccLoginParams) => {
  const res = await http.post("/user/acc_login", {
    ...accLoginParams,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 邮箱登录
 */
export const emailLogin = async (emailLoginParams: EmailLoginParams) => {
  const res = await http.post("/user/email_login", {
    ...emailLoginParams,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 账号注册
 */
export const accRegister = async (accRegParams: AccRegisterParams) => {
  console.log(accRegParams);
  const res = await http.post("/user/acc_reg", {
    ...accRegParams,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 邮箱注册
 */
export const emailRegister = async (emailRegParams: EmailRegisterParams) => {
  const res = await http.post("/user/email_reg", {
    ...emailRegParams,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 获取当前角色类型
 */
export const getCurrType = async () => {
  const res = await http.get("/user/type");
  if (res.data) {
    return res.data;
  }
};

/**
 * 获取当前角色类型
 */
export const userLogout = async () => {
  const res = await http.post("/user/logout");
  if (res.data) {
    return res.data;
  }
};
