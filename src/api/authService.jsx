import api from "./apiClient";

export const login = async (email, password) => {
    const res = await api.post("/api/teachers/login", { email, password });
    return res.data.token;
};

export const register = async (email, password) => {
    const res = await api.post("/api/teachers/signup", { email, password });
    return res.data;
};