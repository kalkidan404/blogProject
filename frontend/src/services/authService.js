import api from "../api/axios";

export const register = async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post("/api/auth/login", userData);
    return response.data;
};