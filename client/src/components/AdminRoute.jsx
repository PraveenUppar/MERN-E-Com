import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Check if the user is an admin from the userInfo Redux store
export default function AdminRoute() {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
