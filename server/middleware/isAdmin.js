const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Token not provided"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Access denied: not an admin"});
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("JWT error:", error.message);
        return res.status(401).json({message: "Invalid token"});
    }
};

module.exports = isAdmin;