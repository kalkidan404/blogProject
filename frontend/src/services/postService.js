import api from "../api/axios";



export const getAllPosts = async () => {

    const response = await api.get("/api/posts");

    return response.data;

};





export const getPostById = async (id) => {

    const response = await api.get(`/api/posts/${id}`);

    return response.data;

};





export const createPost = async (postData) => {

    const response = await api.post("/api/posts", postData);

    return response.data;

};





export const updatePost = async (id, postData) => {

    const response = await api.put(
        `/api/posts/${id}`,
        postData
    );

    return response.data;

};





export const deletePost = async (id) => {

    const response = await api.delete(`/posts/${id}`);

    return response.data;

};