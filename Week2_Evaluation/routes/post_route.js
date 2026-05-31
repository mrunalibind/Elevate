import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../controllers/post_controller.js";

const postRouter = express();

postRouter.post("/", authMiddleware, createPost);
postRouter.get("/", getAllPost);
postRouter.get("/:id", getPostById);

postRouter.patch("/:id", authMiddleware, updatePost);
postRouter.delete("/:id", authMiddleware, deletePost);

export default postRouter;