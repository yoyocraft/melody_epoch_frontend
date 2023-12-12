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
