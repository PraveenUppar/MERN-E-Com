import express from "express"

const router = express.Router()

import Product from "../models/product.model.js"


// Get all the products from the products data 
// actual route will be http://localhost:0000/api/products/
router.get("/", async(req,res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
    }
})

// Get the product with the speific request params
// actual route will be http://localhost:0000/api/products/:id
router.get("/:id", async (req,res) => {
    try {
        const product = await Product.findByID(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error)
    }
        
})


export default router