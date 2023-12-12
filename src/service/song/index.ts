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
  console.log("@@ ", res);

  if (res.data) {
    return res.data;
  }
};
