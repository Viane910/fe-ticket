import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./home/home";
import Tentang from "./tentang/tentang";
import AjukanPertanyaan from "./ajukanPertanyaan/ajukanPertanyaan";
import PetunjukPenggunaan from "./petunjukPenggunaan/petunjuk-penggunaan";
import LoginAdmin from "./Admin-Dashboard/dashboardAdmin/login.admin";
import DashboardAdmin from "./Admin-Dashboard/dashboardAdmin/dashboard-admin";
import PetunjukPenggunaanAdminDashboard from "./Admin-Dashboard/petunjukPenggunaan/petunjukPenggunaanAdminDashboard";
import KelolaUser from "./Admin-Dashboard/kelola-user/kelolaUser";
import KelolaPertanyaan from "./Admin-Dashboard/kelola-pertanyaan/kelolaPertanyaan";
import TicketingPertanyaanBispro from "./Admin-Dashboard/ticketing-pertanyaan-bispro/ticketingPertanyaanBispro";
import TicketingTerjawab from "./Admin-Dashboard/ticketing-pertanyaan-bispro/ticketingTerjawab";

// Komponen
import ProtectedRoute from "./components/proctectedRoute";

import "./index.css";

// 🔥 helper biar clean
const isLogin = () => localStorage.getItem("isLogin") === "true";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export default function App() {
  const user = getUser();

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/ajukan-pertanyaan" element={<AjukanPertanyaan />} />
      <Route path="/petunjuk-penggunaan" element={<PetunjukPenggunaan />} />
      <Route path="/login" element={<LoginAdmin />} />

      {/* ADMIN ROUTES (LOGIN ONLY) */}
      <Route
        path="/dashboardAdmin"
        element={
          isLogin() ? <DashboardAdmin /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/petunjuk-penggunaan-admin-dashboard"
        element={
          isLogin() ? (
            <PetunjukPenggunaanAdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/kelola-pertanyaan"
        element={
          <ProtectedRoute allowedRoles={["MASTER"]}>
            <KelolaPertanyaan />
          </ProtectedRoute>
        }
      />

      {/* 🔥 MASTER ONLY ROUTE */}
      <Route
        path="/kelola-user"
        element={
          isLogin() && user?.role === "MASTER" ? (
            <KelolaUser />
          ) : isLogin() ? (
            <Navigate to="/dashboardAdmin" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ticketing-pertanyaan-bispro"
        element={
          isLogin() && user?.role === "ADMIN_BISPRO" ? (
            <TicketingPertanyaanBispro />
          ) : isLogin() ? (
            <Navigate to="/dashboardAdmin" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ticketing/terjawab"
        element={
          isLogin() ? <TicketingTerjawab /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}
