import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// useSelector: Redux hook that allows your component to read data from the Redux store.

export default function PrivateRoute() {
  // extracts the userInfo object from the user slice. This userInfo object contains data about the currently logged-in user,
  const { userInfo } = useSelector((state) => state.user);
  // if the userInfo exisst then renders outletcomponent else redirects to login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
