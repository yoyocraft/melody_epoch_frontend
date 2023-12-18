export interface LikeReq {
  likeId: number;
  type: number;
}

export interface LikeAlbumStatus {
  canLike: boolean;
  isLiked: boolean;
  isScored: boolean;
}

export interface ScoreAlbumReq {
  albumId: number;
  score: number;
}

export interface FanInfo {
  fanId: number;
  name: string;
  gender: number;
  age: number;
  career: string;
  education: string;
}

export interface EditFanReq {
  fanId: number;
  name: string;
  gender: number;
  age: number;
  career: string;
  education: string;
}
