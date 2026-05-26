export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Authorization: Bearer secret123

    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== "secret123") {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
}