// importing jwt tokens from the jsonwebtoken modules (npm i jsonwebtoken)
import jwt from "jsonwebtoken";

// This function generates a JWT token and sets it as a cookie in the response.
// The token contains the user's ID  and is signed with a secret key from the environment variables.
// jwt.sign(...)  It is a jsonwebtoken method which is used to create and sign a new token
// res.cookie(...): This is a method from the express library that sets a cookie in the user's browser
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, //1day
  });
};

export default generateToken;

// The user ID is sent from the user model when a user logs in or registers.
// Create a new JWT that contains the user's ID.
// Sign this token using a secret key.
// Set this signed token as a cookie in the user's browser.
