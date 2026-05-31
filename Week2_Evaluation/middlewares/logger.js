export const logger = (req, res, next) => {
    try {
        console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
        next();
    }
    catch (error) {
        console.error("Logging error:", error);
        next(error);
    }
}