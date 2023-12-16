import http from "../../plugins/http";
import { ScoreAlbumReq, LikeReq } from "../../model/fan/index";

export const like = async (params: LikeReq) => {
  const res = await http.post("/fan/like", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const unlike = async (params: LikeReq) => {
  const res = await http.post("/fan/unlike", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const getLikeAlbumStatus = async (albumId: number) => {
  const res = await http.get("/fan/like/album/status", {
    params: {
      albumId,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const scoreAlbum = async (params: ScoreAlbumReq) => {
  const res = await http.post("/fan/score", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const listMyLikedBand = async () => {
  const res = await http.get("/fan/like/band");
  if (res.data) {
    return res.data;
  }
};

export const listMyLikedAlbum = async () => {
  const res = await http.get("/fan/like/album");
  if (res.data) {
    return res.data;
  }
};
export const listMyLikedSong = async () => {
  const res = await http.get("/fan/like/song");
  if (res.data) {
    return res.data;
  }
};
