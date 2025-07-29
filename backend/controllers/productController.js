import Product from "../models/product.model.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.error(error) 

    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByID(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error)
    }
}