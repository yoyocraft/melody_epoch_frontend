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

// 异步http.get请求，获取用户喜欢的乐队列表
export const listMyLikedBand = async () => {
  const res = await http.get("/fan/like/band");
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

export const listMyLikedAlbum = async () => {
  const res = await http.get("/fan/like/album");
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

export const listMyLikedSong = async () => {
  const res = await http.get("/fan/like/song");
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
