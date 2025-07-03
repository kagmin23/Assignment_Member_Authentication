import { api } from "../../../../api/baseApi";

export const getAccounts = async () => {
  const res = await api.get("/members/accounts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const deleteAccount = async (id) => {
  const res = await api.delete(`/accounts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
