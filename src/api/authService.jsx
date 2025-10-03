import api from "./apiClient";

export const login = async (email, passphrase) => {
  const res = await api.post("/teachers/login", { email, passphrase });
  return res.data.token;
};

export const register = async (name, email, passphrase) => {
  const res = await api.post("/teachers/signup", { name, email, passphrase });
  return res.data;
};
