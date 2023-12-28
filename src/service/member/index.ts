import http from "../../plugins/http";
import { EditPartReq, JoinBandReq } from "../../model/member";

// 异步http.get请求,根据分页信息获取乐队成员信息列表
export const listMemberInfoByPage = async (curr: number, size: number) => {
  const res = await http.get("/member/list/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，获取当前乐队的成员的列表
export const listMemberInCurrBand = async () => {
  const res = await http.get("/member/curr");
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据当前分页信息，获取当前乐队成员列表
export const listMemberInCurrBandByPage = async (
  curr: number,
  size: number,
) => {
  const res = await http.get("/member/curr/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

//异步http.get请求，根据分页信息及乐队ID获取乐队成员列表
export const listMemberInBandByPage = async (
  bandId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/member/band/page", {
    params: {
      bandId,
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.put请求，编辑成员信息
export const editPart = async (params: EditPartReq) => {
  const res = await http.put("/member/part", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

//异步http.post请求，加入乐队请求
export const joinBand = async (params: JoinBandReq) => {
  const res = await http.post("/member/join", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，离开乐队请求
export const leaveBand = async (params: JoinBandReq) => {
  const res = await http.post("/member/leave", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
