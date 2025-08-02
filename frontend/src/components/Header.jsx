// Importing necessary libraries and hooks from React
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// Importing icons from react-icons
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
// Importing toast for notifications
import { toast } from "react-toastify";
// Importing necessary hooks and functions from Redux
// useSelector is a hook to extract data from the Redux store
// useDispatch is used to dispatch actions to the Redux store
import { useSelector, useDispatch } from "react-redux";
// ?????????????????????????????????????????????????????????????
import { useLogoutMutation } from "../slices/userApiSlice";
//  When called, it creates an action object that will be dispatched to the Redux store to update the user's state, marking them as logged out.
import { logout } from "../slices/userSlice";

function Header() {
  // State variables to manage the visibility of mobile menu, profile menu, and admin menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  // grabs the value of the keyword parameter from the URL and stores it in a new constant called urlKeyword.
  // It uses useState to create a local state variable for the search bar's input field.
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  // Redirect user to new route
  const navigate = useNavigate();
  // useDispatch is used to dispatch actions to the Redux store
  const dispatch = useDispatch();

  //
  const [logoutApi] = useLogoutMutation();
  //
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("logged Out Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const renderProfileButton = () => {
    return (
      <>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="text-white flex items-center"
        >
          <FiUser className="mr-1" />
          {userInfo?.name}
          {isProfileMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
        </button>
        <ul
          className={`absolute ${
            isProfileMenuOpen ? "block" : "hidden"
          } bg-gray-800 p-2 mt-2 space-y-2 text-white border rounded-md`}
        >
          <li>
            <Link to="/profile">
              <FiUser className="mr-1" />
              Profile
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>
              <FiLogOut className="mr-1" />
              Logout
            </Link>
          </li>
        </ul>
      </>
    );
  };
  const renderAdminButton = () => {
    return (
      <>
        <button
          onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          className="text-white flex items-center"
        >
          <FiUser className="mr-1" />
          Admin
          {isAdminMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
        </button>
        <ul
          className={`absolute ${
            isAdminMenuOpen ? "block" : "hidden"
          } bg-gray-800 p-2 mt-2 space-y-2 text-white border rounded-md`}
        >
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
      </>
    );
  };

  const renderSignInButton = () => (
    <Link className="flex items-center" to="/login">
      <FiLogIn className="mr-1 text-white" />
      <button className="text-white">Sign In</button>
    </Link>
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            E-Com
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="ml-4 p-2 rounded-md bg-gray-700 text-white hidden sm:block"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hidden sm:block ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <Link to="/cart" className="text-white flex items-center">
            <FiShoppingCart className="mr-1" />
            Cart
            <span className="bg-blue-500 text-white rounded-full px-3 py-1 ml-2">
              {cartItems.length}
            </span>
          </Link>

          {userInfo && (
            <div className="relative group">{renderProfileButton()}</div>
          )}
          {userInfo?.isAdmin && (
            <div className="relative group ">{renderAdminButton()}</div>
          )}
          {!userInfo && renderSignInButton()}
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mt-4 sm:hidden">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md bg-gray-700 text-white w-full mb-2"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2">
            Search
          </button>
          <div className="space-y-2">
            <Link to="/cart" className="text-white flex items-center">
              <FiShoppingCart className="mr-1" />
              Cart
              <span className="bg-blue-500 text-white rounded-full px-3 py-1 ml-2">
                {cartItems.length}
              </span>
            </Link>
            {userInfo && (
              <div className="relative group ">{renderProfileButton()}</div>
            )}
            {userInfo?.isAdmin && (
              <div className="relative group ">{renderAdminButton()}</div>
            )}
            {!userInfo && renderSignInButton()}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
