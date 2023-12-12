import http from "../../plugins/http";
import { BandAddReq } from "../../model/band";

export const listBandBriefInfo = async () => {
  const res = await http.get("/band/list");
  if (res.data) {
    return res.data;
  }
};

export const listBandInfoVO = async (bandId: number) => {
  const res = await http.get("/band/list/all", {
    params: {
      bandId,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const addBand = async (params: BandAddReq) => {
  const res = await http.post("/band/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
