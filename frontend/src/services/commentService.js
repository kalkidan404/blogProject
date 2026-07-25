import api from "../api/axios";



export const getPostComments = async (postId) => {

    const response = await api.get(`/comments/post/${postId}`);

    return response.data;

};





export const createComment = async (commentData) => {

    const response = await api.post(
        "/comments",
        commentData
    );

    return response.data;

};





export const deleteComment = async (id) => {

    const response = await api.delete(
        `/comments/${id}`
    );

    return response.data;

};