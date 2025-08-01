import express from "express";
import {
  deleteUser,
  forgotPassword,
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers);

// user auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

// user profile update route
router.route("/update").put(updateUserProfile);

// password reset routes
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").patch(resetPassword);

// admin routes
router
  .route("/:id")
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;
