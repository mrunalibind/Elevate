export const errorHandler = (err, req, res, next) => {
    try {
        res.status(500).json({ error: "Internal Server Error" });
    } catch (error) {
        next(error);
    }
}