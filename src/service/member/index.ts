import http from "../../plugins/http";
import { EditPartReq } from "../../model/member";

export const listMemberInfo = async () => {
  const res = await http.get("/member/list");
  if (res.data) {
    return res.data;
  }
};

export const listMemberInCurrBand = async () => {
  const res = await http.get("/member/curr_band");
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
