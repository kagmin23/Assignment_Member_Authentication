import { api } from "../../../../api/baseApi";

export const getPlayers = async (params) => {
  const res = await api.get("/players", { params });
  return res.data;
};

export const addPlayer = async (data) => {
  const res = await api.post("/players", data);
  return res.data;
};

export const updatePlayer = async (id, data) => {
  const res = await api.put(`/players/${id}`, data);
  return res.data;
};

export const deletePlayer = async (id) => {
  const res = await api.delete(`/players/${id}`);
  return res.data;
};
