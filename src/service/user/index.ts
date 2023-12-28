import http from "../../plugins/http";
import {
  AccLoginParams,
  AccRegisterParams,
  BindEmailReq,
  EditUserReq,
  EmailLoginParams,
  EmailRegisterParams,
  QueryReq,
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
export const getAuthType = async () => {
  const res = await http.get("/user/auth");
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

/**
 * 获取当前登录角色信息
 */
export const getCurrUser = async () => {
  const res = await http.get("/user/curr");
  if (res.data) {
    return res.data;
  }
};

/**
 * 修改当前登录角色信息
 */
export const editUserInfo = async (params: EditUserReq) => {
  const res = await http.put("/user/edit", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 绑定邮箱信息
 */
export const bindEmail = async (params: BindEmailReq) => {
  const res = await http.post("/user/bind/email", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const queryInfo = async (params: QueryReq) => {
  const res = await http.post("/user/query", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
