import http from "../../plugins/http";
import { AddCommentReq } from "../../model/comment";

// 异步http.post请求，添加评论
export const addComment = async (params: AddCommentReq) => {
  const res = await http.post("/comment/add", {
    ...params,
  });
  if (res.data) {
    return res.data;
  }
};
