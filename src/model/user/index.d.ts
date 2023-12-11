export interface EmailRegisterParams {
  email: string;
  password: string;
  checkedPassword: string;
  code: string;
  type: number;
}

export interface AccRegisterParams {
  account: string;
  password: string;
  checkedPassword: string;
  type: number;
}

export interface AccLoginParams {
  account: string;
  password: string;
}

export interface EmailLoginParams {
  email: string;
  password: string;
  code: string;
  loginType: number;
}
