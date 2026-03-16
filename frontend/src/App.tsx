import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Uniforms from "./pages/Uniforms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageCategories from "./pages/admin/ManageCategories";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  // Use session storage so preloader only shows once per session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("app_preloaded");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleFinish = () => {
    setLoading(false);
    sessionStorage.setItem("app_preloaded", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <AnimatePresence mode="wait">
            {loading && <Preloader onFinish={handleFinish} />}
          </AnimatePresence>

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/uniforms" element={<Uniforms />} />
              <Route path="/customize" element={<Navigate to="/uniforms?category=customize" replace />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminProtectedRoute>
                    <ManageProducts />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <AdminProtectedRoute>
                    <ManageCategories />
                  </AdminProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
