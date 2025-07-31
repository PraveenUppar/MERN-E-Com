// importing the products from the database
import Product from "../models/product.model.js";

// Function to get all products using mongoose method find. This function fetches all products from the database and sends them as a JSON response
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
  }
};

// Function to get product by ID using mongoose method findById. This function fetches a specific product based on the provided ID in the request parameters and sends it as a JSON response
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};
