const express = require("express");
const router = express.Router();

const {
    createComment,
    getPostComments,
    updateComment,
    deleteComment
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");


// Create comment
// POST /api/comments
router.post("/", authMiddleware, createComment);


// Get comments for a post
// GET /api/comments/post/:postId
router.get("/post/:postId", getPostComments);


// Update comment
// PUT /api/comments/:id
router.put("/:id", authMiddleware, updateComment);


// Delete comment
// DELETE /api/comments/:id
router.delete("/:id", authMiddleware, deleteComment);


module.exports = router;