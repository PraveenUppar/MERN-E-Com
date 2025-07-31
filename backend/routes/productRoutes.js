import express from "express";
const router = express.Router();

import { getProducts } from "../controllers/productController.js";
router.get("/", getProducts);

import { getProductById } from "../controllers/productController.js";
router.get("/:id", getProductById);

export default router;

// express.Router() - a mini-Express application that's isolated from the main app object.
//
