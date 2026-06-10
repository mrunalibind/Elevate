import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getSlots } from "../controllers/slot.controller.js";

const slotRoutes = express.Router();

slotRoutes.get("/", authMiddleware, getSlots);

export default slotRoutes;