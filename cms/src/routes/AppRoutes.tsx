import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CMSLayout } from "../components/layout/CMSLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ContentPage from "../pages/ContentPage";
import Media from "../pages/Media";
import Users from "../pages/Users";
import { currentUser } from "../store/authStore";

const Guard = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const user = currentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <Guard>
            <CMSLayout />
          </Guard>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<ContentPage type="blogs" />} />
        <Route path="/insights" element={<ContentPage type="insights" />} />
        <Route path="/case-studies" element={<ContentPage type="case-studies" />} />
        <Route path="/resources" element={<ContentPage type="resources" />} />
        <Route path="/integrations" element={<ContentPage type="integrations" />} />
        <Route path="/frameworks" element={<ContentPage type="frameworks" />} />
        <Route path="/media" element={<Media />} />
        <Route
          path="/users"
          element={
            <Guard role="SUPERADMIN">
              <Users />
            </Guard>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
