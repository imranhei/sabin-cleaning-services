import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const { pathname } = location;
  // Define routes accessible to all unauthenticated users
  const publicRoutes = ["/login"];

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  }

  const authRoutes = ["admin"];
  // check pathname includes any value of auth routes
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  if (!isAuthenticated && isAuthRoute) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && pathname.includes("auth/login")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;
