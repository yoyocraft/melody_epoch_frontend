import http from "../../plugins/http";
import { AlbumAddReq, SongToAlbumReq } from "../../model/album";

export const addAlbum = async (params: AlbumAddReq) => {
  const res = await http.post("/album/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const listAlbumBriefInfo = async () => {
  const res = await http.get("/album/list");
  if (res.data) {
    return res.data;
  }
};

export const currBandAllAlbums = async () => {
  const res = await http.get("/album/curr");
  if (res.data) {
    return res.data;
  }
};

export const addSongsToAlbum = async (params: SongToAlbumReq) => {
  const res = await http.put("/album/songs", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

export const getAlbumDetailsInfo = async (albumId: number) => {
  const res = await http.get("/album/info", {
    params: {
      albumId,
    },
  });
  if (res.data) {
    return res.data;
  }
};
