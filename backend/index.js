import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";

import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
passport(app);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

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

import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

import stripe from "./utils/stripe.js";
stripe(app);

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running in port", PORT);
  connectDB();
});
