// Utility function that configures and initializes Passport.js for your Express application

// sets up a session middleware to store user data between requests.
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStategy } from "passport-google-oauth20";

// This function configures Passport.js with Google OAuth strategy and sets up session management for user authentication.
const passportUtil = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  // Initialize Passport and restore authentication state, if any, from the session.
  app.use(passport.initialize());
  app.use(passport.session()); // enable persistent login sessions.

  passport.use(
    new GoogleStategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, callback) => {
        callback(null, profile);
      }
    )
  );

  // serializeUser: This determines what data from the user object should be stored in the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  //  This function is called on every subsequent request to retrieve the user object from the session.
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportUtil;

// npm i passport-google-oauth20 express-session passport axios
