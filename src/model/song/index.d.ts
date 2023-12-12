export interface Song {
  songId: number;
  name: string;
  bandId: number;
  author: string;
  albumId: number;
  albumName: string;
}

export interface SongAddReq {
  name: string;
  author: string;
}

export interface SongItem {
  songId: number;
  name: string;
}
