import express from "express";

import { getAvailableSlots } from "../controllers/public.controller.js";

const publicRoutes = express.Router();

publicRoutes.get("/:profileId/slots", getAvailableSlots);

export default publicRoutes;