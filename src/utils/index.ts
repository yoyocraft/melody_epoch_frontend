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
