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
  isRelease: number;
  canEdit: boolean;
  canJoin: boolean;
  canLeave: boolean;
}
export interface ConcertInfo {
  concertId: number;
  name: string;
  startTime: string;
  endTime: string;
  place: string;
  bandName: string;
  maxNum: number;
  songInfoVOList: SongInfo[];
}

export interface JoinConcertReq {
  concertId: number;
}
export interface EditConcertReq {
  concertId: number;
  name: string;
  startTime: Date;
  endTime: Date;
  place: string;
  maxNum: number;
  songIdList: number[];
}

export interface ReleaseConcertReq {
  concertId: number;
}

export interface ConcertJoinInfo {
  concertId: number;
  joinedNum: number;
  canJoin: boolean;
  canLeave: boolean;
}
