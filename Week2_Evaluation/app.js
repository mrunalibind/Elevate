import express from "express";
import dotnenv from "dotenv";
dotnenv.config();
import cors from "cors";
import connection from "./db.js";
import userRouter from "./routes/user_route.js";
import { logger } from "./middlewares/logger.js";
import { limiter } from "./middlewares/rateLimiter.js";
import postRouter from "./routes/post_route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(limiter);

app.use("/user", userRouter);
app.use("/post", postRouter);

app.get("/", (req, res)=>{
    res.send("hello")
})

app.listen(process.env.PORT, async() => {    
    try {
        await connection;   
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }   
});

