import express from "express";
import passport from "passport";

import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// This route initiates the Google OAuth flow by redirecting the user to Google's authentication page
// It uses the query parameters to specify the client ID, redirect URI, and other OAuth parameters
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// This route handles the callback from Google after the user has authenticated
// It uses Passport.js to authenticate the user with the Google strategy
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
);

// Handle successful login
// This route is called after successful authentication with Google
router.get("/login/success", async (req, res) => {
  if (req.user) {
    // Check if the user exists in the database
    const userExists = await User.findOne({ email: req.user._json.email });
    // If user exists, generate a token and send it back
    if (userExists) {
      generateToken(res, userExists._id);
    } else {
      // If user does not exist, create a new user and generate a token
      const newUser = new User({
        name: req.user._json.name,
        email: req.user._json.email,
        password: Date.now(),
      });
      generateToken(res, newUser._id);
      await newUser.save();
    }
    //
    res.status(200).json({
      user: { ...req.user, isAdmin: userExists.isAdmin },
      message: "Succesfully logged in",
      _id: userExists._id,
    });
  } else {
    res.status(403).json({
      message: "Not Authorized",
    });
  }
});

// login failed
router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

// logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

export default router;
