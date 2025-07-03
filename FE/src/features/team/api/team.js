import { api } from "../../../api/baseApi";

export const fetchTeams = async () => {
  const res = await api.get("/teams");
  return res.data;
};

export const createTeam = async (data) => {
  const res = await api.post("/teams", data);
  return res.data;
};

export const updateTeam = async (teamId, data) => {
  const res = await api.put(`/teams/${teamId}`, data);
  return res.data;
};

export const deleteTeam = async (teamId) => {
  const res = await api.delete(`/teams/${teamId}`);
  return res.data;
};
