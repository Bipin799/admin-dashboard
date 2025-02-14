import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ClientDashboard from "./components/ClientDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import ProductDetails from "./components/ProductDetails";
//import DashboardPage from "./components/DashboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />

        {/* ✅ Protected Routes with Outlet */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Route>

        {/* <Route path="/client-dashboard" element={<ClientDashboard/>}/> */}

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* ✅ Default Route */}
        <Route path="/" element={<Login />} />

        {/* ✅ 404 Route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};
export default App;
