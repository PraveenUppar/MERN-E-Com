import express from "express";
import {
  addOrderItems,
  getUserOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

// protect and admin act as middleware for order routes
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ********* User order routes *****************

router.post("/", protect, addOrderItems);
router.get("/user-orders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

// ********* Admin order routes *****************

router.get("/", protect, admin, getOrders);
router.patch("/deliver/:id", protect, admin, updateOrderToDelivered);

export default router;
