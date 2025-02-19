
// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const userRole = localStorage.getItem("role");
//   const location = useLocation();

//   return (
//     <div>
//       { userRole || allowedRoles.includes(userRole) ? (
//         <Outlet />
//       ) : (
//         <Navigate to="/unauthorized" state={{ from: location }} replace />
//       )}
//     </div>
//   );
// };
// export default ProtectedRoute;



// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
//   const location = useLocation();

//   // Check if userRole exists and if it matches any of the allowedRoles
//   if (userRole && allowedRoles.includes(userRole)) {
//     return <Outlet />;
//   }

//   // If not, redirect to the unauthorized page
//   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
// };

// export default ProtectedRoute;



// ProtectedRoute.js
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//   const userRole = loggedInUser?.role;


//   // Check if the user is logged in and their role matches the allowed roles
//   if (!loggedInUser || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/login" replace />; // Redirect to login if not authorized
//   }

//   return <Outlet />; // Allow access if authorized
// };
// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(loggedInUser.role)) {
    return <Navigate to="/unauthorized" />; // Redirect unauthorized users
  }

  return <Outlet />;
};

export default ProtectedRoute;
