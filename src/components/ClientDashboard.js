// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { Box, Typography, Stack, Divider, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";

// const ClientDashboard = () => {
//   console.log("✅ Rendering ClientDashboard Component");

//   const [activeSection, setActiveSection] = useState("dashboard"); // ✅ Track active section
//   const navigate = useNavigate();

//   const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//   const username = storedUser?.email || "Customer"; // ✅ Ensure a default value

//   // ✅ Log section changes for debugging
//   useEffect(() => {
//     console.log(`🔄 Switched to: ${activeSection}`);
//   }, [activeSection]);

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Logged out successfully!");
//     setTimeout(() => navigate("/login"), 1500);
//   };

//   return (
//     <AppProvider theme={demoTheme}>
//     {/* <DashboardLayout navigation={<SidebarMenu activeSection={activeSection} setActiveSection={setActiveSection} />}> */}

//     <DashboardLayout 
//   navigation={[
//     { title: "Dashboard", icon: <DashboardIcon />, onClick: () => setActiveSection("dashboard") },
//     { title: "Orders", icon: <ShoppingCartIcon />, onClick: () => setActiveSection("orders") }
//   ]}>
      
//       {/* ✅ Content inside DashboardLayout */}
//       <Box sx={{ p: 3 }}>
//         {activeSection === "dashboard" && <DashboardPage username={username} />}
//         {activeSection === "orders" && <OrdersPage />}
//       </Box>

//     </DashboardLayout>

//     <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
//   </AppProvider>
//   );
   
// };

// export default ClientDashboard;

// // ✅ Sidebar Menu (Ensures Sidebar is Visible & Functional)
// //const SidebarMenu = () => {
//   const SidebarMenu = ({ activeSection, setActiveSection }) => { 
//     // ✅ Define an array of menu items
//     const menuItems = [
//       { title: "Dashboard", icon: <DashboardIcon />, onClick: () => setActiveSection("dashboard") },
//       { title: "Orders", icon: <ShoppingCartIcon />, onClick: () => setActiveSection("orders") }
//     ];
  
//     return (
//       <MenuList sx={{ 
//         width: "250px", 
//         minHeight: "100vh", 
//         backgroundColor: "#f5f5f5", // ✅ Ensure visibility
//         borderRight: "2px solid #ccc",
//         paddingTop: "10px",
//         position: "relative" // ✅ Keeps it inside layout
//       }}> 
//         {/* ✅ Loop through menuItems to render menu */}
//         {menuItems.map((item, index) => (
//           <MenuItem 
//             key={index}
//             selected={activeSection === item.title.toLowerCase()} 
//             onClick={item.onClick}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </MenuItem>
//         ))}
//       </MenuList>
//     );
//   };


// // ✅ Sidebar Footer (Logout)
// const SidebarFooter = ({ handleLogout }) => {
//   return (
//     <Stack direction="column">
//       <Divider />
//       <MenuList>
//         <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
//           <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
//           <ListItemText primary="Logout" />
//         </MenuItem>
//       </MenuList>
//     </Stack>
//   );
// };

// // ✅ Dashboard Page (Now Receives `username` as a Prop)
// const DashboardPage = ({ username }) => { // ✅ Accept `username` as a prop
//   return (
//     <Box sx={{ textAlign: "center", p: 3 }}>
//       <Typography variant="h4">📊 Welcome, {username}</Typography>
//       <Typography variant="body1" sx={{ mt: 2 }}>
//         This is the main dashboard where you can access different sections.
//       </Typography>
//     </Box>
//   );
// };

// // ✅ Orders Page
// const OrdersPage = () => {
//   return (
//     <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
//       <Typography variant="h5" color="primary">
//         🛒 Orders Section
//       </Typography>
//       <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
//         Here you can manage all your orders.
//       </Typography>
//     </Box>
//   );
// };

// // ✅ Theme Configuration
// const demoTheme = createTheme({
//   cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
// });


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Box, Typography, Stack, Divider, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

const ClientDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  // Retrieve user data from localStorage with error handling
  const storedUser = () => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    } catch {
      return {};
    }
  };
  const username = storedUser()?.email || "Customer";

  // Restore active section from localStorage on component mount
  useEffect(() => {
    const savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  // Save active section to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  // Navigation items
  const navigationItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      pageId: "dashboard",
      onClick: () => setActiveSection("dashboard"),
      selected: activeSection === "dashboard",
    },
    {
      title: "Orders",
      icon: <ShoppingCartIcon />,
      pageId: "orders",
      onClick: () => setActiveSection("orders"),
      selected: activeSection === "orders",
    },
  ];

  return (
    <AppProvider theme={demoTheme}>
      <DashboardLayout
        navigation={navigationItems}
        slots={{
          sidebarFooter: () => <SidebarFooter handleLogout={handleLogout} />,
        }}
        sx={{ display: "flex", height: "100vh" }}
      >
        <Box sx={{ p: 3 }}>
          {activeSection === "dashboard" && <DashboardPage username={username} />}
          {activeSection === "orders" && <OrdersPage />}
        </Box>
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default ClientDashboard;

// Sidebar Footer Component
const SidebarFooter = ({ handleLogout }) => {
  return (
    <Stack direction="column">
      <Divider />
      <MenuList>
        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </MenuList>
    </Stack>
  );
};

// Dashboard Page Component
const DashboardPage = ({ username }) => {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h4">📊 Welcome, {username}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is the main dashboard where you can access different sections.
      </Typography>
    </Box>
  );
};

// Orders Page Component
const OrdersPage = () => {
  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" color="primary">
        🛒 Orders Section
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
        Here you can manage all your orders.
      </Typography>
    </Box>
  );
};

// Theme Configuration
const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});
