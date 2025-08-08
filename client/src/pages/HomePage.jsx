import Product from "../components/Product";

import axios from "axios";
// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { BACKEND_URL } from "../constants";
// useDispatch is used to dispatch actions to the Redux store
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/userSlice";
// import { useGetProductsQuery } from "../slices/productsApiSlice";

function HomePage() {
  const [products, setProducts] = useState([]);
  // fetch the products from the backend api and set it to the products state
  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const dispatch = useDispatch();

  // check if the user is already logged in. It's triggered when the page loads.
  const getUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true, // tells the browser to include cookies with the request,
      });
      dispatch(
        setCredentials({
          ...res.data.user._json,
          _id: res.data._id,
          isAdmin: res.data.user.isAdmin,
        })
      );
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // const { keyword, pageNumber } = useParams();

  // const { data, isLoading, error } = useGetProductsQuery({
  //   keyword,
  //   pageNumber,
  // });

  return (
    // For mobile screen resloution grid-col is 1 for tablets grid-col is 2 and for laptop and computer the grid-col is 4 (it will show the products grid depending on screen size)
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {/* pass prodcts as the arguments to the product compoenent to render each product */}
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
