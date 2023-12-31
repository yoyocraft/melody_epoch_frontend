import http from "../../plugins/http";
import { ReleaseSongReq, SongAddReq } from "../../model/song/index";

// 异步http.post请求，添加歌曲
export const addSong = async (params: SongAddReq) => {
  const res = await http.post("/song/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，获取歌曲列表
export const listSongItems = async () => {
  const res = await http.get("/song/items");
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据当前分页信息获取歌曲列表
export const listSongInfoByPage = async (curr: number) => {
  const res = await http.get("/song/list/page", {
    params: {
      curr,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据当前分页信息获取当前乐队的歌曲列表
export const currBandSongsByPage = async (curr: number, size: number) => {
  const res = await http.get("/song/curr/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.get请求，根据分页信息及乐队ID，获取乐队歌曲列表（指定乐队）
export const getBandSongsByPage = async (
  bandId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/song/band/page", {
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

// 异步http.get请求，根据分页信息获取专辑的歌曲列表
export const getAlbumSongsByPage = async (
  albumId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/song/album/page", {
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

// 异步http.get请求，根据专辑ID获取专辑的歌曲信息
export const listSongToAlbum = async (albumId: number) => {
  const res = await http.get("/song/album/to", {
    params: {
      albumId,
    },
  });
  if (res.data) {
    return res.data;
  }
};

// 异步http.post请求，发布歌曲
export const releaseSong = async (params: ReleaseSongReq) => {
  const res = await http.post("/song/release", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
