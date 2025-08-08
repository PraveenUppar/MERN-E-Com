// importing user from the database and its methods
import User from "../models/user.model.js";
// Middleware for Express that simplifies error handling in asynchronous routes. (npm i express-async-handler)
import asyncHandler from "express-async-handler";
// This function generates a JWT token and sets it as a cookie in the response.
import generateToken from "../utils/generateToken.js";
// This function sends an email to the user.
import sendEmail from "../utils/sendEmail.js";
// The crypto module provides a wide range of cryptographic functionality, including hashing, encryption.
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
  //  Destructure the name, email and password from the request body
  const { name, email, password } = req.body;
  // Check if the user email is already present(findOne is a mongoose method to find) in the database
  const userExists = await User.findOne({ email });
  // if the user email is already present in the database then throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  // if the user is not in the database then create(User.crete is a mongoose method to create) a new user with the name, email and password
  const user = await User.create({ name, email, password });
  // if user sends the required params then generate a jwt token
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
    throw new Error("Invalid Credentials");
  }
});

// Update user profile function
const updateUserProfile = asyncHandler(async (req, res) => {
  //  Destructure id from the request body
  const { _id } = req.body;
  // Check if the user id is already present(findById is a mongoose method to find) in the database
  const user = await User.findById(_id);
  // if the use id is in the database
  if (user) {
    // If req.body.name exists and has a value, use it to update user.name. Otherwise, keep the existing value of user.name
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Only updates the user.password property if a new password is provided in the request body (req.body.password is truthy).
    // This is a good practice, as you wouldn't want to overwrite a hashed password with an empty string.
    if (req.body.password) user.password = req.body.password;
    // if
    await user.save();
    res.status(200);
    res.json({
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
  //  Destructure email from the request body
  const { email } = req.body;
  // Check if the user email is already present(findOne is a mongoose method to find) in the database
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  // if the user email is present in the database then genereate a reset token
  const resetToken = user.createPasswordResetToken();
  user.save();
  // the resetURL is sent to the user email with the original resest token as the paraetes in the URL
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
    // if the reset token and expiry is not defined (i.e null) it will throw an error
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
// Once the user recieves a URL of the reset password the user can set a new password and make a request to the backend
// As the URL contains the original reset token it is destructed from the params
// The original reset token is checked with the hashed reset token in the backend if a user exists with the same token then the password is reset
const resetPassword = asyncHandler(async (req, res) => {
  //  It performs the same hashing operation (using SHA-256) as when the token was first generated and saved to the database.
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  // The stored hashed token on the user document must match the hashed token from the request.checks if the token is still valid and has not expired.
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // If the user is not present then it will throw an error
  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired",
    });
  }
  // if the user is preset in the database then the new password is set and the reset token ans expiry are nullified
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // pre-save hook that automatically hashes this new password using a strong algorithm like bcrypt before it's saved
  user.save();
  // Once the password is set the jwt token is created for the user for futher login and auth
  generateToken(res, user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// ************ Admin route logic *****************

// Admin functions to get all the users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Admin function to get user by ID
const getUserById = asyncHandler(async (req, res) => {
  // get individual user to update name,email and isAdmin by user_id
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// Admin function to update user details by ID
const updateUser = asyncHandler(async (req, res) => {
  // get individual user to update name,email and isAdmin by user_id
  const user = await User.findById(req.params.id);
  // if the user is present in the database based on user_id
  // send updated user name,email and isAdmin to database to save the updated values if any of the values is empty then no change
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

// Admin function to delete user by ID
const deleteUser = asyncHandler(async (req, res) => {
  // get individual user to update name,email and isAdmin by user_id
  const user = await User.findById(req.params.id);
  // if the user is present in the database based on user_id
  if (user) {
    // Mongoose delete method based on user_id which will sent as req.params.id
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
