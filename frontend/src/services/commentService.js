import api from "../api/axios";


export const getPostComments = async (postId) => {

    const response = await api.get(`/api/comments/post/${postId}`);

    return response.data;

};



export const createComment = async (commentData) => {

    const response = await api.post(
        "/api/comments",
        commentData
    );

    return response.data;

};



export const deleteComment = async (id) => {

    const response = await api.delete(
        `/api/comments/${id}`
    );

    return response.data;

};