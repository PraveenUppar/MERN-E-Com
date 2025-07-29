import express from "express"
const router = express.Router()

// Get all the products from the products data actual route will be http://localhost:0000/api/products/
// Before the route and the logic was in one file below we have separated the route and the logic in route and controller folders respectively
// router.get("/", async(req,res) => {
//     try {
//         const products = await Product.find({})
//         res.json(products)
//     } catch (error) {
//         console.log(error)
//     }
// })

// Now we have moved the logics for the route to product controller and here onlt defined the route and the function
import {getProducts} from "../controllers/productController.js"
router.get("/",getProducts)


// Get the product with the speific request params actual route will be http://localhost:0000/api/products/:id
// Before the route and the logic was in one file below we have separated the route and the logic in route and controller folders respectively
// router.get("/:id", async (req,res) => {
//     try {
//         const product = await Product.findByID(req.params.id)
//         res.json(product)
//     } catch (error) {
//         console.log(error)
//     }    
// })


// Now we have moved the logics for the route to product controller and here onlt defined the route and the function
import {getProductById} from "../controllers/productController.js"
router.get("/:id",getProductById)



export default router