export interface LikeReq {
  likeId: number;
  type: number;
}

export interface LikeAlbumStatus {
  isLiked: boolean;
  isScored: boolean;
}

export interface ScoreAlbumReq {
  albumId: number;
  score: number;
}
