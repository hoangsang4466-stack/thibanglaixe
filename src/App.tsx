import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingZalo from './components/FloatingZalo';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Payment from './pages/Payment';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminOrders from './pages/Admin/Orders';
import AdminSettings from './pages/Admin/Settings';
import AdminPricing from './pages/Admin/Pricing';
import AdminPayment from './pages/Admin/PaymentSettings';
import AdminProvinces from './pages/Admin/Provinces';
import AdminLanding from './pages/Admin/LandingPages';
import AdminReviews from './pages/Admin/Reviews';
import AdminSMS from './pages/Admin/SMS';
import AdminLogin from './pages/Admin/Login';
import Lookup from './pages/Lookup';
import AdminLayout from './layouts/AdminLayout';
import AIChat from './components/AIChat';
import SocialProof from './components/SocialProof';
import { OrderProvider } from './context/OrderContext';
import { ConfigProvider } from './context/ConfigContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('admin_session') === 'true';
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/lookup" element={<Lookup />} />
          <Route path="/:province" element={<LandingPage />} />
          <Route path="/payment/:orderId" element={<Payment />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><AdminOrders /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/pricing" element={<ProtectedRoute><AdminLayout><AdminPricing /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/payment" element={<ProtectedRoute><AdminLayout><AdminPayment /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/provinces" element={<ProtectedRoute><AdminLayout><AdminProvinces /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/landing" element={<ProtectedRoute><AdminLayout><AdminLanding /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute><AdminLayout><AdminReviews /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/sms" element={<ProtectedRoute><AdminLayout><AdminSMS /></AdminLayout></ProtectedRoute>} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingZalo />}
      {!isAdminPage && <AIChat />}
      {!isAdminPage && <SocialProof />}
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <OrderProvider>
        <Router>
          <AppContent />
        </Router>
      </OrderProvider>
    </ConfigProvider>
  );
}
