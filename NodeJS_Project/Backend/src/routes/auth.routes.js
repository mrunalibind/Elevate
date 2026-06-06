import express from "express";
import passport from "passport";

import googleCallback from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/gmail.send",
    ],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

export default authRoutes;