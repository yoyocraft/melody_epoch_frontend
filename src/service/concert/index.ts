import http from "../../plugins/http";
import { ConcertAddReq, JoinConcertReq } from "../../model/concert/index";

export const addConcert = async (params: ConcertAddReq) => {
  const res = await http.post("/concert/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const listConcertBriefInfo = async () => {
  const res = await http.get("/concert/list");
  if (res.data) {
    return res.data;
  }
};

export const listCurrConcertInfoVO = async (concertId: number) => {
  const res = await http.get("/concert/all", {
    params: {
      concertId,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const joinConcert = async (params: JoinConcertReq) => {
  const res = await http.post("/concert/join", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const leaveConcert = async (params: JoinConcertReq) => {
  const res = await http.post("/concert/leave", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const getCurrConcertInfo = async () => {
  const res = await http.get("/concert/curr", {});
  if (res.data) {
    return res.data;
  }
};
