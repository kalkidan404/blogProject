const { verifyToken } = require("../config/jwt");


const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }


    const [type, token] = authHeader.split(" ");


    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }


    try {

        const decodedUser = verifyToken(token);

        req.user = decodedUser;

        next();


    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};


module.exports = authMiddleware;