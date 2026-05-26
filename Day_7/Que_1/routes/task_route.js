import express from "express";
import { createTask, deleteTask, getTaskById, getTasks } from "../controllers/task_controller.js";
const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.delete("/:id", deleteTask);

export default router;