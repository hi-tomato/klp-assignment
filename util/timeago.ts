import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const timeAgo = (timestamp: string) => {
  return dayjs(timestamp).fromNow();
};
