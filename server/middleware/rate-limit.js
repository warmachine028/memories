import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
    max: 10,
    windowMS: 10000, 
});

export default limiter;