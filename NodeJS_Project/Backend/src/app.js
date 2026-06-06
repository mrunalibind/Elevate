import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import interviewerRoutes from "./routes/interviewer.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/interviewer", interviewerRoutes);

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
