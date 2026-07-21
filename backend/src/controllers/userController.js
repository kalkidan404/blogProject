const prisma = require("../config/prisma");


// Get current logged-in user
const getCurrentUser = async (req, res, next) => {
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true
            }
        });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json(user);


    } catch (error) {
        next(error);
    }
};




// Get user profile by ID
const getUser = async (req, res, next) => {
    try {

        const { id } = req.params;


        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                username: true,
                createdAt: true,
                posts: {
                    where: {
                        published: true
                    },
                    select: {
                        id: true,
                        title: true,
                        createdAt: true
                    }
                }
            }
        });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json(user);


    } catch (error) {
        next(error);
    }
};





// Update username/email
const updateUser = async (req, res, next) => {
    try {

        const { username, email } = req.body;


        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                username,
                email
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });


        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });


    } catch (error) {
        next(error);
    }
};





// Delete account
const deleteUser = async (req, res, next) => {
    try {

        await prisma.user.delete({
            where: {
                id: req.user.id
            }
        });


        res.json({
            message: "Account deleted successfully"
        });


    } catch (error) {
        next(error);
    }
};



module.exports = {
    getCurrentUser,
    getUser,
    updateUser,
    deleteUser
};