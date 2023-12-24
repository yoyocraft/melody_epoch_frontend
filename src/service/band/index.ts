import http from "../../plugins/http";
import { BandAddReq, EditBandReq } from "../../model/band";

// export const listBandBriefInfo = async () => {
//   const res = await http.get("/band/list");
//   if (res.data) {
//     return res.data;
//   }
// };

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

export const listCurrBandInfoVO = async () => {
  const res = await http.get("/band/curr");
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

export const releaseBandInfo = async () => {
  const res = await http.post("/band/release");
  if (res.data) {
    return res.data;
  }
};

export const unReleaseBandInfo = async () => {
  const res = await http.post("/band/unrelease");
  if (res.data) {
    return res.data;
  }
};

export const currBandReleaseStatus = async () => {
  const res = await http.get("/band/release/status");
  if (res.data) {
    return res.data;
  }
};

export const editBandInfo = async (params: EditBandReq) => {
  const res = await http.put("/band/edit", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
