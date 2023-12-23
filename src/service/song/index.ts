import http from "../../plugins/http";
import { SongAddReq } from "../../model/song/index";

export const addSong = async (params: SongAddReq) => {
  const res = await http.post("/song/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const listSongItems = async () => {
  const res = await http.get("/song/items");
  if (res.data) {
    return res.data;
  }
};

export const listSongInfo = async () => {
  const res = await http.get("/song/list");
  if (res.data) {
    return res.data;
  }
};

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

export const currBandSongs = async () => {
  const res = await http.get("/song/curr");
  if (res.data) {
    return res.data;
  }
};

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

export const listSongToAlbum = async (albumId: number) => {
  const res = await http.get("/song/album", {
    params: {
      albumId,
    },
  });
  if (res.data) {
    return res.data;
  }
};
