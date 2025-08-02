import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/userSlice";
import { useParams } from "react-router-dom";
// import Paginate from "../components/Paginate";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true,
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

  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    // For mobile screen resloution grid-col is 1 for tablets grid-col is 2 and for laptop and computer the grid-col is 4 (it will show the products grid depending on screen size)
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {
        // It will pass the data from the productsd data to the componenets products which renders the product
        // Data from products --> Home Page --> Components Product --> Render the component
        products.map((product, i) => (
          <Product key={i} product={product} />
        ))
      }
    </div>
  );
}

export default HomePage;
