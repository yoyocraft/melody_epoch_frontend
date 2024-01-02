import http from "../../plugins/http";
import {
  AddAlbumReq,
  EditAlbumReq,
  ReleaseAlbumReq,
  SongToAlbumReq,
} from "../../model/album";

/**
 * 异步向服务器发送POST请求
 * @param params
 * @returns
 */
export const addAlbum = async (params: AddAlbumReq) => {
  const res = await http.post("/album/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步发送http.get请求路径 ==> 得到 album的list
 * @param curr
 * @returns
 */
export const listAlbumBriefInfoByPage = async (curr: number) => {
  const res = await http.get("/album/list/page", {
    params: {
      curr,
    },
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步发送http.get,请求到路径
 * @returns
 */
export const currBandAllAlbums = async () => {
  const res = await http.get("/album/curr");
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步发送http.get请求，请求到路径 ==> 获取当前乐队的所有专辑信息
 * @param curr
 * @param size
 * @returns
 */
export const currBandAllAlbumsByPage = async (curr: number, size: number) => {
  const res = await http.get("/album/curr/page", {
    params: {
      curr,
      size,
    },
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步http.get请求，请求到路径 ==> 获得当前乐队的所有专辑（指定乐队）
 * @param bandId
 * @param curr
 * @param size
 * @returns
 */
export const getBandAlbumsByPage = async (
  bandId: number,
  curr: number,
  size: number,
) => {
  const res = await http.get("/album/band/page", {
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

/**
 * 异步http.put请求，将歌曲添加到专辑中
 * @param params
 * @returns
 */
export const addSongsToAlbum = async (params: SongToAlbumReq) => {
  const res = await http.put("/album/songs", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步http.get请求，根据专辑ID获取专辑信息
 * @param albumId
 * @returns
 */
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

/**
 * 异步http.post请求，发布专辑信息
 * @param params
 * @returns
 */
export const releaseAlbumInfo = async (params: ReleaseAlbumReq) => {
  const res = await http.post("/album/release", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步http.put请求，编辑专辑信息
 * @param params
 * @returns
 */
export const editAlbumInfo = async (params: EditAlbumReq) => {
  const res = await http.put("/album/edit", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};

/**
 * 异步http.grt请求，获取热门专辑信息
 * @returns
 */
export const getTopAlbums = async () => {
  const res = await http.get("/album/top");
  if (res.data) {
    return res.data;
  }
};
