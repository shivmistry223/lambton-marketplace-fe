import { LOGOUT } from "./constant";

export const handleLogout = async () => {
  try {
    const response = await fetch(LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      message.success(data.message || "Logged out successfully.");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      message.error(data.message || "Logout failed.");
    }
  } catch (error) {
    message.error("Network error, please try again.");
  }
};

export const userExists = () => localStorage.getItem("token");
