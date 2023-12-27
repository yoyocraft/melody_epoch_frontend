import { EditFanReq, FanInfo } from "../fan";
import { EditMemberReq, MemberInfo } from "../member";

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

export interface UserAuthType {
  isFan: boolean;
  isLeader: boolean;
  isAdmin: boolean;
}

export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  type: number;
  memberInfoVO: MemberInfo;
  fanInfoVO: FanInfo;
}

export interface BindEmailReq {
  email: string;
  code: string;
}

export interface EditUserReq {
  userId: number;
  nickname: string;
  type: number;
  editMemberReq: EditMemberReq;
  editFanReq: EditFanReq;
}

export interface QueryReq {
  searchText: string;
  searchType: number;
  current: number;
}
