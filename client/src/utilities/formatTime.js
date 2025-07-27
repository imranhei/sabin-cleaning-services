export const formatTime = (date) => {
  if (!(date instanceof Date)) return "";
  return date.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
