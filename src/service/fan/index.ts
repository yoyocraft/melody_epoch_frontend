import http from "../../plugins/http";
import { ScoreAlbumReq, LikeReq } from "../../model/fan/index";

// 异步http.post请求，点赞（喜欢）
export const like = async (params: LikeReq) => {
  const res = await http.post("/fan/like", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，取消点赞
export const unlike = async (params: LikeReq) => {
  const res = await http.post("/fan/unlike", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据专辑ID获取喜欢的专辑的点赞状态
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

// 异步http.post请求，为专辑打分
export const scoreAlbum = async (params: ScoreAlbumReq) => {
  const res = await http.post("/fan/score", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，获取用户喜欢的专辑列表
export const listMyLikedBandByPage = async (curr: number, size: number) => {
  const res = await http.get("/fan/like/band/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，获取用户喜欢的歌曲列表
export const listMyLikedAlbumByPage = async (curr: number, size: number) => {
  const res = await http.get("/fan/like/album/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const listMyLikedSongByPage = async (curr: number, size: number) => {
  const res = await http.get("/fan/like/song/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const listMyJoinedConcertByPage = async (curr: number, size: number) => {
  const res = await http.get("/fan/joined/concert/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const getBandFansByBandIdAndPage = async (
  bandId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/fan/band/fans/page", {
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

export const getAlbumFansByBandIdAndPage = async (
  albumId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/fan/album/fans/page", {
    params: {
      albumId,
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const getSongFansByBandIdAndPage = async (
  songId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/fan/song/fans/page", {
    params: {
      songId,
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export const getConcertFansByBandIdAndPage = async (
  concertId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/fan/concert/fans/page", {
    params: {
      concertId,
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};
