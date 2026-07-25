import api from "../api/axios";


export const getCurrentUser = async () => {

    const response = await api.get("/users/me");

    return response.data;

};



export const updateUser = async (userData) => {

    const response = await api.put(
        "/users/me",
        userData
    );

    return response.data;

};