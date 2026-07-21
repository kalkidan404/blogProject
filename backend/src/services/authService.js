const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../config/jwt");


// Register user service
const registerUserService = async (username, email, password) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (existingUser) {
        throw new Error("Email already exists");
    }


    const hashedPassword = await hashPassword(password);


    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    });


    return user;
};




// Login user service
const loginUserService = async (email, password) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (!user) {
        throw new Error("Invalid email or password");
    }


    const passwordMatch = await comparePassword(
        password,
        user.password
    );


    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }


    const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role
    });


    return token;
};



module.exports = {
    registerUserService,
    loginUserService
};