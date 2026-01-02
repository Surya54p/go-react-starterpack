import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("../pages/auth/SignUpPage"));
const UserDashboard = lazy(() => import("../pages/user/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const HomePage = lazy(() => import("../pages/HomePage"));
const NotFoundPage = lazy(() => import("../pages/PageNotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
