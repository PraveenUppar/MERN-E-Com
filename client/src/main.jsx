import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";
import ProductListPage from "./pages/admin/ProductListPage.jsx";
import OrderListPage from "./pages/admin/OrderListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import UserEditPage from "./pages/admin/UserEditPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    // The path prop specifies the URL path for the route, and the element prop specifies the component to render when that path is matched.
    // The App component is the root component of application
    <Route path="/" element={<App />}>
      {/* index={true} indicates that this is the default route when the path is exactly "/" */}
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      {/*Private Routes*/}
      {/* Protected route checks if the userInfo is stord in local storage if true then renders the outlet component else redirect to login page */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/place-order" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/success-screen" element={<SuccessPage />} />
      </Route>
      {/*Admin Routes*/}
      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/users" element={<UserListPage />} />
        <Route path="/admin/users/:id/edit" element={<UserEditPage />} />
        <Route path="/admin/products" element={<ProductListPage />} />
        <Route path="/admin/orders" element={<OrderListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
      </Route>
    </Route>
  )
);

// ReactDOM acts as a bridge between React's virtual DOM and the actual browser DOM, allowing React components to be rendered and manipulated within a web page.
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
