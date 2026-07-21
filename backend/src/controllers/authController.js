const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../config/jwt");


// Register user
const registerUser = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;


        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }


        const hashedPassword = await hashPassword(password);


        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });


        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role
        });


        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        next(error);
    }
};



// Login user
const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;


        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const passwordMatch = await comparePassword(
            password,
            user.password
        );


        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role
        });


        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        next(error);
    }
};



module.exports = {
    registerUser,
    loginUser
};