import 'dotenv/config';
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Interviewer from "../models/interviewer.model.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_CALLBACK_URL) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        accessType: "offline",
        prompt: "consent",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let interviewer = await Interviewer.findOne({
            googleId: profile.id,
          });

          if (!interviewer) {
            interviewer = await Interviewer.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,

              accessToken,
              refreshToken,

              profileId: `user_${Date.now()}`,
            });
          } else {
            interviewer.accessToken = accessToken;

            if (refreshToken) {
              interviewer.refreshToken = refreshToken;
            }

            await interviewer.save();
          }

          return done(null, interviewer);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
} else {
  console.warn(
    "Missing Google OAuth env vars (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL). GoogleStrategy not configured."
  );
}