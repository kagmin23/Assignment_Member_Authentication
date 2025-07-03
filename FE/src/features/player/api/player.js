import { api } from "../../../api/baseApi";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getPlayers = async (params = {}) => {
  const res = await api.get("/players", {
    params,
    ...authHeader(),
  });
  return res.data;
};

export const getPlayerDetail = async (playerId) => {
  const res = await api.get(`/players/${playerId}`, authHeader());
  return res.data;
};

export const sendFeedback = async (playerId, feedback) => {
  const res = await api.post(
    `/players/${playerId}/comments`,
    feedback,
    authHeader()
  );
  return res.data;
};

export const createPlayer = async (data) => {
  const res = await api.post("/players", data, authHeader());
  return res.data;
};

export const updatePlayer = async (playerId, data) => {
  const res = await api.put(`/players/${playerId}`, data, authHeader());
  return res.data;
};

export const deletePlayer = async (playerId) => {
  const res = await api.delete(`/players/${playerId}`, authHeader());
  return res.data;
};
