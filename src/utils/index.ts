import { CommentVO } from "../model/comment";

export function formatDate(time: string) {
  if (time === "" || time === void 0 || time === null) return "-";
  // 创建一个 Date 对象
  var originalDate = new Date(time);

  // 提取年、月、日
  var year = originalDate.getFullYear();
  var month = ("0" + (originalDate.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1
  var day = ("0" + originalDate.getDate()).slice(-2);

  // 构建新的日期字符串
  return year + "-" + month + "-" + day;
}

export function formatDateTime(time: string) {
  if (time === "" || time === void 0 || time === null) return "-";
  // 创建一个 Date 对象
  var originalDate = new Date(time);

  // 提取年、月、日、时、分、秒
  var year = originalDate.getFullYear();
  var month = ("0" + (originalDate.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1
  var day = ("0" + originalDate.getDate()).slice(-2);
  var hours = ("0" + originalDate.getHours()).slice(-2);
  var minutes = ("0" + originalDate.getMinutes()).slice(-2);
  var seconds = ("0" + originalDate.getSeconds()).slice(-2);

  // 构建新的日期字符串
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}

export const GENDER_MAP = ["女", "男"];

export function formatCommentCreateTimes(commentVO: CommentVO): void {
  commentVO.createTime = formatDateTime(commentVO.createTime);

  if (commentVO.childrenComments && commentVO.childrenComments.length > 0) {
    commentVO.childrenComments.forEach((childComment) => {
      formatCommentCreateTimes(childComment);
    });
  }
}
