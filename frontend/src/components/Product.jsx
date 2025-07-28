import { Link } from 'react-router-dom'

// It will take the product as parameter from the home page which contains the data from the product data and renders it

export default function Product({ product }) {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="bg-white p-4 shadow-md rounded-md cursor-pointer border-gray-200 border-1">
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-2" />
                <h2 className="text-lg font-semibold overflow-ellipsis">{product.name}</h2>
                <div className="flex items-center mt-1">
                    <span className="text-yellow-500 mr-1">{product.rating}</span>
                    <span className="text-gray-500">({product.numReviews} reviews)</span>
                </div>
                <p className="mt-2 text-gray-700">${product.price.toFixed(2)}</p>
            </div>
        </Link>
    )
}