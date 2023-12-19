import { SongInfo } from "../song";

export interface Concert {
  concertId: number;
  name: string;
  startTime: string;
  endTime: string;
  place: string;
  bandId: number;
  bandName: string;
  songIdsStr: number;
  maxNum: number;
}

export interface ConcertAddReq {
  name: string;
  startTime: Date;
  endTime: Date;
  place: string;
  songIdList: number[];
  maxNum: number;
}

export interface ConcertBriefInfo {
  concertId: number;
  name: string;
  startTime: string;
  endTime: string;
  place: string;
  bandName: string;
  maxNum: number;
  canEdit: boolean;
}
export interface ConcertInfo {
  concertId: number;
  name: string;
  startTime: string;
  endTime: string;
  place: string;
  bandName: string;
  maxNum: number;
  joinedNum: number;
  songInfoVOList: SongInfo[];
  isJoined: boolean;
  canJoin: boolean;
}

export interface JoinConcertReq {
  concertId: number;
}
export interface EditConcertReq {
  concertId: number;
  name: string;
  startTime: string;
  endTime: string;
  place: string;
  maxNum: number;
  songIdList: number[];
}
