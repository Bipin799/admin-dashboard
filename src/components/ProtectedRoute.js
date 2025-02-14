
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  return (
    <div>
      {allowedRoles.includes(userRole) ? (
        <Outlet />
      ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      )}
    </div>
  );
};
export default ProtectedRoute;
