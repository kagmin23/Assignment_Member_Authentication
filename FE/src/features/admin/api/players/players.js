import { api } from "../../../../api/baseApi";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getPlayers = async (params) => {
  const res = await api.get("/players", {
    ...authHeader(),
    params,
  });
  return res.data;
};

export const addPlayer = async (data) => {
  const res = await api.post("/players", data, authHeader());
  return res.data;
};

export const updatePlayer = async (id, data) => {
  const res = await api.put(`/players/${id}`, data, authHeader());
  return res.data;
};

export const deletePlayer = async (id) => {
  const res = await api.delete(`/players/${id}`, authHeader());
  return res.data;
};
