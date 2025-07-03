import { api } from "../../../../api/baseApi";

const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getTeams = async () => {
  const res = await api.get("/teams", authHeader);
  return res.data;
};

export const addTeam = async (data) => {
  const res = await api.post("/teams", data, authHeader);
  return res.data;
};

export const updateTeam = async (id, data) => {
  const res = await api.put(`/teams/${id}`, data, authHeader);
  return res.data;
};

export const deleteTeam = async (id) => {
  const res = await api.delete(`/teams/${id}`, authHeader);
  return res.data;
};
