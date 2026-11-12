import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import AdminDashboard from "./Pages/admin/Dashboard";

import AdminProducts from "./Pages/admin/Products";
import AdminOrders from "./Pages/admin/Orders";
import AdminCustomers from "./Pages/admin/Customers";
import AdminDiscounts from "./Pages/admin/Discounts";
import AdminAnalytics from "./Pages/admin/Analytics";
import AdminSettings from "./Pages/admin/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin: sidebar + top bar layout, Pages render in <Outlet /> */}
        <Route path="/admin" element={<Layout />}>
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
