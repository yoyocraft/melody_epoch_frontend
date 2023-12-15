export interface CommentVO {
  commentId: number;
  albumId: number;
  content: string;
  parentId: number;
  userId: number;
  userName: string;
  createTime: string;
  childrenComments: CommentVO[];
}

export interface AddCommentReq {
  albumId: number;
  parentId: number;
  content: string;
}
