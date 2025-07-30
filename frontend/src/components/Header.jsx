import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/userSlice";

function Header() {
  // The default state is false when the screen resolution is small then the state is set to True which will render the isMobileMenuOpen code when clicked shows the content
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword: urlKeyword } = useParams();

  const [logoutApi] = useLogoutMutation();

  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

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
      {/* Parent div for logo, search and cart which is also the deafult isMobileMenuOpen state*/}
      <div className="flex items-center justify-between">
        {/* First child div for logo which also acts as a parent div for search and input*/}
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
        {/* Second child div for cart */}
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
        {/* Third child div for button visible only in mobile resolution and when clicked will render the below code and changing the state to TRUE*/}
        <div className="sm:hidden">
          <button
            // on click the useState changes from False to True thus showing the button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {/* What should happen when the resolution is small(mobile) i.e isMobileMenuOpen is True render the below code */}
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
