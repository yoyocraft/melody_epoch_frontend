import http from "../../plugins/http";
import {
  ConcertAddReq,
  EditConcertReq,
  JoinConcertReq,
  ReleaseConcertReq,
} from "../../model/concert/index";

// 异步http.post请求，添加演唱会
export const addConcert = async (params: ConcertAddReq) => {
  const res = await http.post("/concert/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// export const listConcertBriefInfo = async () => {
//   const res = await http.get("/concert/list");
//   if (res.data) {
//     return res.data;
//   }
// };

// 异步http.get请求，根据当前页码获取演唱会的简介（列表）
export const listConcertBriefInfoByPage = async (curr: number) => {
  const res = await http.get("/concert/list/page", {
    params: {
      curr,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据演唱会ID获取所有演唱会信息（列表）
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

// 异步http.post请求，加入演唱会请求
export const joinConcert = async (params: JoinConcertReq) => {
  const res = await http.post("/concert/join", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，取消加入演唱会请求
export const leaveConcert = async (params: JoinConcertReq) => {
  const res = await http.post("/concert/leave", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const getCurrConcertJoinInfo = async (concertId: number) => {
  const res = await http.get("/concert/join/status", {
    params: {
      concertId,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// export const getCurrConcertInfo = async () => {
//   const res = await http.get("/concert/curr", {});
//   if (res.data) {
//     return res.data;
//   }
// };

// 异步http.grt请求，获取当前演唱会的信息（分页列表）
export const getCurrConcertInfoByPage = async (curr: number, size: number) => {
  const res = await http.get("/concert/curr/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据乐队ID获取乐队的演唱会信息（分页列表）
export const getBandConcertInfoByPage = async (
  bandId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/concert/band/page", {
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

// 异步http.get请求，根据演唱会ID获取演唱会信息
export const getCurrConcertDetails = async (concertId: number) => {
  const res = await http.get("/concert/all", {
    params: {
      concertId,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.put请求，修改演唱会信息
export const editConcertInfo = async (params: EditConcertReq) => {
  const res = await http.put("/concert/edit", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，发布演唱会信息
export const releaseConcert = async (params: ReleaseConcertReq) => {
  const res = await http.post("/concert/release", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，取消发布演唱会信息
export const unReleaseConcert = async (params: ReleaseConcertReq) => {
  const res = await http.post("/concert/unrelease", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
