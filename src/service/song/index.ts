import http from "../../plugins/http";
import { ReleaseSongReq, SongAddReq } from "../../model/song/index";

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

// export const listSongInfo = async () => {
//   const res = await http.get("/song/list");
//   if (res.data) {
//     return res.data;
//   }
// };

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

// export const currBandSongs = async () => {
//   const res = await http.get("/song/curr");
//   if (res.data) {
//     return res.data;
//   }
// };

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

export const releaseSong = async (params: ReleaseSongReq) => {
  const res = await http.post("/song/release", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
