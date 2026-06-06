import express from "express";
import { getProfile } from "../controllers/interviewer.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const interviewerRoutes = express.Router();

interviewerRoutes.get("/profile", authMiddleware, getProfile);

export default interviewerRoutes;