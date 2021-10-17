import JWT from "jsonwebtoken";

// Middleware to make the api private
const verify = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) res.status(401).send("Access denied");
    try {
        const verified = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

export default verify; // send it to user.route
