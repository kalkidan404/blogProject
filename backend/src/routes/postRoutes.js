const express = require("express");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();


// Get all posts
router.get("/", getAllPosts);


// Get single post
router.get("/:id", getPostById);


// Create post (requires login)
router.post("/", authMiddleware, createPost);


// Update post (requires login)
router.put("/:id", authMiddleware, updatePost);


// Delete post (requires login)
router.delete("/:id", authMiddleware, deletePost);



module.exports = router;