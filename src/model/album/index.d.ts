import { CommentVO } from "../comment";
import { SongInfo } from "../song";

export interface Album {
  albumId: string;
  name: string;
  company: string;
  releaseTime: string;
  bandName: string;
  songIdsStr: string;
  profile: string;
  avgScore: number;
  isRelease: number;
}

export interface AddAlbumReq {
  name: string;
  company: string;
  bandName: string;
  profile: string;
}

export interface AlbumInfo {
  albumId: number;
  name: string;
  company: string;
  bandName: string;
  avgScore: number;
  isRelease: number;
  profile: string;
  canLike: boolean;
  isLiked: boolean;
}

export interface SongToAlbumReq {
  albumId: number;
  noneSelectedSongIds: number[];
  selectedSongIds: number[];
}

export interface AlbumDetailsVO {
  albumId: number;
  name: string;
  company: string;
  releaseTime: string;
  bandName: string;
  profile: string;
  avgScore: number;
  songInfoList: SongInfo[];
  commentVOList: CommentVO[];
}

export interface ReleaseAlbumReq {
  albumId: number;
}

export interface EditAlbumReq {
  albumId: number;
  profile: string;
}
