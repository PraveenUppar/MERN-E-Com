import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  updateUserProfile,
  deleteUser,
  forgotPassword,
  getUserById,
  getUsers,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers);

// ********* User routes *****************

// user auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// user profile update route
router.put("/update", updateUserProfile);

// password reset routes
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:resetToken", resetPassword);

// ********* Admin routes *****************

router
  .route("/:id")
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;
