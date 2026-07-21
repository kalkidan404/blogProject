const prisma = require("../config/prisma");


// Create comment
const createComment = async (req, res, next) => {
    try {

        const { content, postId } = req.body;


        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId: req.user.id
            }
        });


        res.status(201).json({
            message: "Comment created successfully",
            comment
        });


    } catch (error) {
        next(error);
    }
};



// Get comments for a post
const getPostComments = async (req, res, next) => {
    try {

        const { postId } = req.params;


        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });


        res.json(comments);


    } catch (error) {
        next(error);
    }
};



// Update comment
const updateComment = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { content } = req.body;


        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        });


        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }


        if (comment.userId !== req.user.id) {
            return res.status(403).json({
                message: "You cannot edit this comment"
            });
        }


        const updatedComment = await prisma.comment.update({
            where: {
                id: Number(id)
            },
            data: {
                content
            }
        });


        res.json({
            message: "Comment updated successfully",
            comment: updatedComment
        });


    } catch (error) {
        next(error);
    }
};



// Delete comment
const deleteComment = async (req, res, next) => {
    try {

        const { id } = req.params;


        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        });


        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }


        if (comment.userId !== req.user.id) {
            return res.status(403).json({
                message: "You cannot delete this comment"
            });
        }


        await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        });


        res.json({
            message: "Comment deleted successfully"
        });


    } catch (error) {
        next(error);
    }
};



module.exports = {
    createComment,
    getPostComments,
    updateComment,
    deleteComment
};