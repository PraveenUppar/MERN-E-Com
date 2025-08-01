// importing user from the database and its methods
import User from "../models/user.model.js";
// Middleware for Express that simplifies error handling in asynchronous routes. (npm i express-async-handler)
import asyncHandler from "express-async-handler";
// This function generates a JWT token and sets it as a cookie in the response.
import generateToken from "../utils/generateToken.js";
//
import sendEmail from "../utils/sendEmail.js";
//
import crypto from "crypto";

// ********* User route logic *****************

// User login function
const loginUser = asyncHandler(async (req, res) => {
  //  Destructure the email and password from the request body
  const { email, password } = req.body;
  // Check if the user email is present in the database
  const user = await User.findOne({ email });
  // we will match the user email first once we find the email of the user then move to password (to compare the user password to the database hashed password)
  // if the user email is in database is true and the user password is true then generate a jwt token (send the user_id as the parameter for generateToken function) and send a response to the user
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error(" Invalid email or password");
  }
});

// User Registration function
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Credentials");
  }
});

// Update user profile function
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// User logout function
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
});

// User forgot password function
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const resetToken = user.createPasswordResetToken();
  user.save();
  const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
  const message = `Forgot Password? Click on this this link to reset your Password: ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token. (valid for 10mins)",
      message,
    });
    res.status(200).json({
      message: "Token Sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    console.log(error);
    res.status(500).json({
      status: "error",
      message:
        "There was an error in sending the email. Please Try again later",
    });
  }
});

// User reset password function
const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired",
    });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// ********* Admin route logic *****************

// Admin functions to get all the users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Admin function to update user details by ID
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    await user.save();

    res.json({ message: "User updated Successfully" });
  } else {
    res.status(404);
    throw new Error("USer Not Found");
  }
});

// Admin function to get user by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Admin function to delete user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "User Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
};
