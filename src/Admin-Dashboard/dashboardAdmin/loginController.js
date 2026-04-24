import api from "../../API/serviceAPI";

export const loginUserController = async ({ username, password }) => {
  try {
    const res = await api.post("/login", {
      username,
      password,
    });

    const data = res.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("name", data.user.name || "");
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logoutUserController = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("name");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("isLogin");
  return {
    message: "Logout berhasil",
  };
};
