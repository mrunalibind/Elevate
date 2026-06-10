import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createAvailability, getAvailability } from '../controllers/availability.controller.js';

const availabilityRoutes = express.Router();

availabilityRoutes.post("/", authMiddleware, createAvailability);

availabilityRoutes.get("/", authMiddleware, getAvailability);

export default availabilityRoutes;