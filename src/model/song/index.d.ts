export interface Song {
  songId: number;
  name: string;
  bandId: number;
  author: string;
  albumId: number;
  albumName: string;
  isRelease: number;
}

export interface SongAddReq {
  name: string;
  author: string;
}

export interface SongItem {
  songId: number;
  name: string;
}

export interface SongInfo {
  songId: number;
  name: string;
  bandName: string;
  author: string;
  albumName: string;
  canLike: boolean;
  isLiked: boolean;
}

export interface SongToAlbumVO {
  noneAlbumSongs: SongItem[];
  albumSongs: SongItem[];
}

export interface ReleaseSongReq {
  songId: number;
}
