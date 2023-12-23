import http from "../../plugins/http";
import { EditPartReq, JoinBandReq } from "../../model/member";

export const listMemberInfo = async () => {
  const res = await http.get("/member/list");
  if (res.data) {
    return res.data;
  }
};

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

export const listMemberInCurrBand = async () => {
  const res = await http.get("/member/curr");
  if (res.data) {
    return res.data;
  }
};

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

export const editPart = async (params: EditPartReq) => {
  const res = await http.put("/member/part", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const joinBand = async (params: JoinBandReq) => {
  const res = await http.post("/member/join", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const leaveBand = async (params: JoinBandReq) => {
  const res = await http.post("/member/leave", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
