import http from "../../plugins/http";
import { BandAddReq, EditBandReq } from "../../model/band";

// export const listBandBriefInfo = async () => {
//   const res = await http.get("/band/list");
//   if (res.data) {
//     return res.data;
//   }
// };

// 异步http.get请求，根据页码获取乐队简要信息（列表）
export const listBandBriefInfoByPage = async (curr: number) => {
  const res = await http.get("/band/list/page", {
    params: {
      curr,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据乐队ID获取乐队信息
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

// 异步http.get请求，获取当前乐队信息
export const listCurrBandInfoVO = async () => {
  const res = await http.get("/band/curr");
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，添加一个新的乐队
export const addBand = async (params: BandAddReq) => {
  const res = await http.post("/band/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，发布乐队信息
export const releaseBandInfo = async () => {
  const res = await http.post("/band/release");
  if (res.data) {
    return res.data;
  }
};

//异步http.post请求，取消发布乐队信息
export const unReleaseBandInfo = async () => {
  const res = await http.post("/band/unrelease");
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，获取当前乐队的状态
export const currBandReleaseStatus = async () => {
  const res = await http.get("/band/release/status");
  if (res.data) {
    return res.data;
  }
};

// 异步http.put请求，编辑乐队信息
export const editBandInfo = async (params: EditBandReq) => {
  const res = await http.put("/band/edit", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
