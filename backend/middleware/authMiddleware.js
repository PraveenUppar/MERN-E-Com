import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// Protect route for admin
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // It expects the JWT to be stored in an HTTP-only cookie named req.cookies.jwt
  token = req.cookies.jwt;
  // if jwt token is present
  if (token) {
    try {
      // rememeber jwt token stores the user_id which is hashed with a secret key
      // jwt.verify() takes the token and the secret key that was used to sign it.
      // If the token's signature is valid and it hasn't expired, it returns the decoded payload like the user's ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // uses the userId from the decoded token payload to find the user document in the database.
      // Mongoose method that excludes the password field from the retrieved user object for security reasons.
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
    // It will throw error if jwt token is not present
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin route
const admin = (req, res, next) => {
  //  The protect middleware authenticated user's document to req.user. If req.user is not defined, it means no user is logged in, and the condition fails.
  // checks if isAdmin property of the authenticated user's object is true
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
