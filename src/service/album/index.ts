import http from "../../plugins/http";
import { AlbumAddReq } from "../../model/album";

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
