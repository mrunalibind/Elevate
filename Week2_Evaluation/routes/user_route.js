import express from "express";
import { login, register } from "../controllers/user_controller.js";
const userRouter = express();

userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;