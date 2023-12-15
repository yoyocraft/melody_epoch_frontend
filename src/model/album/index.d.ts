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
}

export interface AlbumAddReq {
  name: string;
  company: string;
  bandName: string;
  profile: string;
}

export interface AlbumBriefInfo {
  albumId: number;
  name: string;
  company: string;
  bandName: string;
  avgScore: number;
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
