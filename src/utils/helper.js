export const userExists = () => localStorage.getItem("token");

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user._id;
};

export const getOrdinalTerm = (n) => {
  if (n <= 0) return "Invalid input";
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  const suffix =
    remainder > 10 && remainder < 20 ? "th" : suffixes[n % 10] || "th";
  return `${n}${suffix} term`;
};

export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
