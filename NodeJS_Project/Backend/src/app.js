import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import interviewerRoutes from "./routes/interviewer.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import slotRoutes from "./routes/slot.routes.js";
import publicRoutes from "./routes/public.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/interviewer", interviewerRoutes);
app.use("/availability", availabilityRoutes);
app.use("/slots", slotRoutes);
app.use("/public", publicRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Welcome to the backend server!" 
    });
});

app.get("/success", (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Authentication successful! You can close this window." 
    });
});

app.use(errorHandler);

export default app;
