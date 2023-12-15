import http from "../../plugins/http";
import { AddCommentReq } from "../../model/comment";

export const addComment = async (params: AddCommentReq) => {
  const res = await http.post("/comment/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
