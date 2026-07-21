const prisma = require("../config/prisma");


// Create post
const createPost = async (req, res, next) => {

    try {

        const { title, content } = req.body;


        const post = await prisma.post.create({

            data: {
                title,
                content,
                authorId: req.user.id
            }

        });


        res.status(201).json({
            message: "Post created successfully",
            post
        });


    } catch (error) {

        next(error);

    }

};




// Get all posts
const getAllPosts = async (req, res, next) => {

    try {

        const posts = await prisma.post.findMany({

            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },

                comments: true
            },

            orderBy: {
                createdAt: "desc"
            }

        });


        res.json(posts);


    } catch (error) {

        next(error);

    }

};




// Get single post
const getPostById = async (req, res, next) => {

    try {

        const { id } = req.params;


        const post = await prisma.post.findUnique({

            where: {
                id: Number(id)
            },

            include: {
                author: true,
                comments: true
            }

        });


        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }


        res.json(post);


    } catch (error) {

        next(error);

    }

};




// Update post
const updatePost = async (req, res, next) => {

    try {

        const { id } = req.params;

        const { title, content } = req.body;


        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });


        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }



        if (post.authorId !== req.user.id) {

            return res.status(403).json({
                message: "Not allowed"
            });

        }



        const updatedPost = await prisma.post.update({

            where: {
                id: Number(id)
            },

            data: {
                title,
                content
            }

        });


        res.json({
            message: "Post updated",
            post: updatedPost
        });


    } catch(error) {

        next(error);

    }

};





// Delete post
const deletePost = async (req, res, next) => {

    try {

        const { id } = req.params;


        const post = await prisma.post.findUnique({

            where: {
                id: Number(id)
            }

        });


        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }



        if (post.authorId !== req.user.id) {

            return res.status(403).json({
                message: "Not allowed"
            });

        }



        await prisma.post.delete({

            where: {
                id: Number(id)
            }

        });



        res.json({
            message: "Post deleted"
        });



    } catch(error) {

        next(error);

    }

};




module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};