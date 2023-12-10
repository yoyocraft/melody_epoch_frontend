import http from "../../plugins/http";
import { EMAIL_LOGIN_TYPE } from "../../model/enums/index";

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
  if (res.code === 0 && res.data) {
    return res.data;
  }
};

export const accLogin = async (account: string, password: string) => {
  const res = await http.post("/user/acc_login", {
    account,
    password,
  });
  if (res?.code === 0 && res.data) {
    return res.data;
  }
};

export const emailPwdLogin = async (email: string, password: string) => {
  const res = await http.post("/user/email_login", {
    email,
    password,
    loginType: EMAIL_LOGIN_TYPE.PASSWORD_LOGIN,
  });
  if (res.code === 0 && res.data) {
    return res.data;
  }
};
export const emailCodeLogin = async (email: string, code: string) => {
  const res = await http.post("/user/email_login", {
    email,
    code,
    loginType: EMAIL_LOGIN_TYPE.CODE_LOGIN,
  });
  if (res?.code === 0 && res.data) {
    return res.data;
  }
};

export const accRegister = async (
  account: string,
  password: string,
  checkedPassword: string,
  type: number,
) => {
  const res = await http.post("/user/acc_reg", {
    account,
    password,
    checkedPassword,
    type,
  });
  if (res?.code === 0 && res.data) {
    return res.data;
  }
};

export const emailRegister = async (
  email: string,
  password: string,
  checkedPassword: string,
  code: string,
  type: number,
) => {
  const res = await http.post("/user/email_reg", {
    email,
    password,
    checkedPassword,
    code,
    type,
  });
  if (res?.code === 0 && res.data) {
    return res.data;
  }
};
