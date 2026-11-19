import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ShopLayout from "./Components/ShopLayout";
import Layout from "./Components/Layout";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminProducts from "./Pages/admin/Products";
import AdminOrders from "./Pages/admin/Orders";
import AdminCustomers from "./Pages/admin/Customers";
import AdminDiscounts from "./Pages/admin/Discounts";
import AdminAnalytics from "./Pages/admin/Analytics";
import AdminSettings from "./Pages/admin/Settings";

function ProtectedAdmin({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer website */}
        <Route element={<ShopLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Layout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="discounts" element={<AdminDiscounts />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
