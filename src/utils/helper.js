export const userExists = () => localStorage.getItem("token");

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user._id;
};
