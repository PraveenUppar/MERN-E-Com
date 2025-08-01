// import express from express module (npm i express)
import express from "express";
// import dotenv from dotenv module (npm i dotenv)
import dotenv from "dotenv";
// import cors from cors module (npm i cors) - cross-orgin-service
import cors from "cors";
// import cookieParser from cookie-parser module (npm i cookie-parser)
import cookieParser from "cookie-parser";

// dotenv.config() loads the environment variables from a .env file into process.env
dotenv.config();
const PORT = process.env.PORT;

// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();

// The express.json() middleware is used to parse incoming requests with JSON payloads, and express.urlencoded() is used to parse incoming requests with URL-encoded payloads commanly used for form submissions.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The cookieParser middleware is used to parse cookies attached to the client request object. This is useful for reading cookies sent by the client, such as authentication tokens(jwt).
app.use(cookieParser());

// This middleware sets the Access-Control-Allow-Origin header to allow requests from http://localhost:3000.
// This is necessary for CORS (Cross-Origin Resource Sharing) to allow the frontend application (3000) to communicate with the backend server running on a different port (5000).
app.use((res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

// This allows the server to accept requests from different origins, which is useful for development when the frontend(3000) and backend(5000) are on different ports.
// By default, web browsers have a security policy called the Same-Origin Policy.
app.use(cors());
// This middleware sets the Access-Control-Allow-Credentials header to true, allowing cookies to be sent with requests from the frontend to the backend.
// This is necessary for authentication and session management.This is used to allow the frontend to make requests to the backend with credentials (like cookies).
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

// Testing the server is running
app.get("/", (res) => {
  res.send("Server is running");
});

// Products api routes
import productRoutes from "./routes/productRoutes.js";
app.use("/api/products/", productRoutes);

// User api routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

// Google OAuth routes
import authRoutes from "./routes/authRoutes.js";
app.use("/auth", authRoutes);

// Orders routes for products ordered and etc
import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

// The passport middleware is used for authentication in the application. It is used for Google Oauth authentication (the logic is implemented in the passport.js file).
import passport from "./utils/passport.js";
passport(app);

// The stripe middlware is used for payments through stripe
import stripe from "./utils/stripe.js";
stripe(app);

// app.use(notFound);
// app.use(errorHandler);

// The logic for connecting to DB (connectDB()) is in the db.js of config folder
import connectDB from "./config/db.js";
app.listen(PORT, () => {
  console.log("Server running in port", PORT);
  connectDB();
});
