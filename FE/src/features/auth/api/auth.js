import { api } from "../../../api/baseApi";

export const login = async (formData) => {
  const response = await api.post("/auth/login", formData);
  return response.data;
};

export const register = async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
};

export default api;
