import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import {products} from "./data/products.js"


dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors())


// Test the server is running 
app.get("/",(req,res) => {
    res.send("Server is running")
})

// Get all the products from the products data 
app.get("/api/products",(req,res) => {
    res.json(products)
})

// Get the product with the speific request params 
app.get("/api/products/:id",(req,res) => {
        const product = products.find(p => p.id == req.params.id)
        res.json(product)
})

app.listen(PORT, () => {
    console.log("Server running in port", PORT)
})