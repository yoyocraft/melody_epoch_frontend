import http from "../../plugins/http";
import { ConcertAddReq } from "../../model/concert/index";

export const addConcert = async (params: ConcertAddReq) => {
  const res = await http.post("/concert/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
