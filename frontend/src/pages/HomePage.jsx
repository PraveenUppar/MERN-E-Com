// First we imported the static data from the frontend itself for rendering as products
// import { products } from "../data/products"

import Product from "../components/Product"

// Now we here are importing the static data from backend through API and rendering it as products replacing the previous one
import axios from "axios"
import { useState, useEffect } from "react"

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get("/api/products")
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    // For mobile screen resloution grid-col is 1 for tablets grid-col is 2 and for laptop and computer the grid-col is 4 (it will show the products grid depending on screen size)
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        { 
            // It will pass the data from the productsd data to the componenets products which renders the product 
            // Data from products --> Home Page --> Components Product --> Render the component 
            products.map((product,i) => (
                <Product key={i} product={product} />
            ))
        }
    </div>
  )
}

export default HomePage