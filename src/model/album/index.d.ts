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
