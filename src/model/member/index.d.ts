export interface Member {
  memberId: number;
  name: string;
  age: number;
  part: string;
  joinTime: string;
  leaveTime: string;
  bandId: number;
  bandName: string;
}

export interface MemberInfo {
  memberId: number;
  name: string;
  gender: number;
  age: number;
  part: string;
  joinTime: string;
  leaveTime: string;
  bandName: string;
}

export interface EditPartReq {
  memberId: number;
  part: string;
}

export interface JoinBandReq {
  bandId: number;
}
