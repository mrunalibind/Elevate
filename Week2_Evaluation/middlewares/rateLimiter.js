import rateLimiter from "express-rate-limit";

export const limiter = rateLimiter({
    windowMs: 15*60*1000,
    max: 100
})