import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test the server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

import productRoutes from "./routes/productRoutes.js";
// Fisrt sent static data from the products data file to frontend through api now connecting DB to send data
// import products from "./data/products.js"

// Here we imported the data from the DB and send it to the frontend though api the same is created in the productRouter but defined as router.get
// import Product from "./models/product.model.js"
// app.get("/api/products", async(req,res) => {
//     try {
//         const products = await Product.find({})
//         res.json(products)
//     } catch (error) {
//         console.log(error)
//     }
// })

// All the endpoints for the products route
app.use("/api/products/", productRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

import authRoutes from "./routes/authRoutes.js";
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server running in port", PORT);
  connectDB();
});
