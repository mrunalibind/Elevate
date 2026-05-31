import express from "express";
import dotnenv from "dotenv";
dotnenv.config();
import cors from "cors";
import connection from "./db.js";
import userRouter from "./routes/user_route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

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

