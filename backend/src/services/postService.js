const prisma = require("../config/prisma");


// Create post
const createPostService = async (title, content, authorId) => {

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId
        }
    });


    return post;
};





// Get all published posts
const getPostsService = async () => {

    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });


    return posts;
};






// Get single post
const getPostService = async (id) => {

    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: {
                select: {
                    username: true
                }
            },
            comments: true
        }
    });


    return post;
};







// Update post
const updatePostService = async (id, title, content) => {

    const post = await prisma.post.update({
        where: {
            id
        },
        data: {
            title,
            content
        }
    });


    return post;
};








// Delete post
const deletePostService = async (id) => {

    await prisma.post.delete({
        where: {
            id
        }
    });


    return true;
};








// Toggle publish status
const togglePublishService = async (id, currentStatus) => {

    const post = await prisma.post.update({
        where: {
            id
        },
        data: {
            published: !currentStatus
        }
    });


    return post;
};




module.exports = {
    createPostService,
    getPostsService,
    getPostService,
    updatePostService,
    deletePostService,
    togglePublishService
};