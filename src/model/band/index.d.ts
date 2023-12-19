import { Member, MemberInfo } from "../member/index";
import { Song, SongInfo } from "../song/index";
import { Album, AlbumInfo } from "../album/index";
import { Concert, ConcertInfo } from "../concert/index";

export interface BandBriefInfo {
  bandId: number;
  name: string;
  foundTime: string;
  leaderName: string;
  memberNum: number;
  isLiked: boolean;
}

export interface BandInfo {
  bandId: number;
  name: string;
  foundTime: string;
  leaderName: string;
  profile: string;
  memberNum: number;
  isRelease: number;
  canLike: boolean;
  isLiked: boolean;
  canJoin: boolean;
  isJoined: boolean;
  members: MemberInfo[];
  songs: SongInfo[];
  albums: AlbumInfo[];
  concerts: ConcertInfo[];
}

export interface BandAddReq {
  bandName: string;
  leaderId: number;
  profile: string;
}

export interface EditBandReq {
  bandId: number;
  profile: string;
}
