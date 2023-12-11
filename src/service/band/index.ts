import http from "../../plugins/http";

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
