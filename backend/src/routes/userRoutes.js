const express = require("express");
const router = express.Router();
const {
    getCurrentUser,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
// Get logged-in user
// GET /api/users/me
router.get("/me", authMiddleware, getCurrentUser);
// Get user profile
// GET /api/users/:id
router.get("/:id", getUser);

// Update profile
// PUT /api/users/me
router.put("/me", authMiddleware, updateUser);
// Delete account
// DELETE /api/users/me
router.delete("/me", authMiddleware, deleteUser);
module.exports = router;