import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export const simplifyTime = (createdAt) => {
  const now = new Date();
  const happened = new Date(createdAt);

  const diff = differenceInSeconds(now, happened);
  let result = '';

  switch (true) {
    // Few seconds ago
    case diff < 60:
      result = `Posted ${diff} ${diff===1? 'second': 'seconds'} ago`;
      break;
    // Few minutes ago
    case diff < 60 * 60:
      const minuteDiff = differenceInMinutes(now, happened);
      result = `Posted ${minuteDiff} ${minuteDiff===1? 'minute': 'minutes'} ago`;
      break;
    // Few hours ago
    case diff < 60 * 60 * 24:
      const hourDiff = differenceInHours(now, happened);
      result = `Posted ${hourDiff} ${hourDiff===1? 'hour': 'hours'} ago`;
      break;
    // Few days ago
    case diff < 60 * 60 * 24 * 7:
      const dayDiff = differenceInDays(now, happened);
      result = `Posted ${dayDiff} ${dayDiff===1? 'day': 'days'} ago`;
      break;
    default:
      result = `Posted at ${happened}`;
      break;
  }

  return result;
};
