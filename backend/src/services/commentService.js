const prisma = require("../config/prisma");


// Create comment
const createCommentService = async (content, postId, userId) => {

    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            userId
        }
    });


    return comment;
};





// Get comments for a post
const getPostCommentsService = async (postId) => {

    const comments = await prisma.comment.findMany({
        where: {
            postId
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });


    return comments;
};






// Update comment
const updateCommentService = async (id, content) => {

    const comment = await prisma.comment.update({
        where: {
            id
        },
        data: {
            content
        }
    });


    return comment;
};








// Delete comment
const deleteCommentService = async (id) => {

    await prisma.comment.delete({
        where: {
            id
        }
    });


    return true;
};





module.exports = {
    createCommentService,
    getPostCommentsService,
    updateCommentService,
    deleteCommentService
};