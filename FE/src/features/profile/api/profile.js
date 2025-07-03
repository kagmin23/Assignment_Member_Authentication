import { api } from "../../../api/baseApi";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProfile = async () => {
  const res = await api.get("/members/me", authHeader());
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/members/me", data, authHeader());
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/members/me/change-password", data, authHeader());
  return res.data;
};
