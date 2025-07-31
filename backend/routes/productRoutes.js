import express from "express";
const router = express.Router();

// route to display all the products
import { getProducts } from "../controllers/productController.js";
router.get("/", getProducts);

// route to display a specific product based on the product id
import { getProductById } from "../controllers/productController.js";
router.get("/:id", getProductById);

export default router;
