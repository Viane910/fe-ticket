import { useEffect, useState } from "react";
import { DataMenuDashboard } from "../../data/data-menu-dashboard";
import { useNavigate } from "react-router-dom";
import AsideDashboard from "../../components/asideDashboard";
import { logoutUserController } from "./loginController";

import DashboardAdminController from "./dashboardAdminController";

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
}

export default function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { totalBelum, totalSudah, totalUsers, totalJawaban } =
    DashboardAdminController();
  const navigate = useNavigate();
  useAuth();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name || "User";
  const role = user.role || "Unknown Role";

  const handleLogOut = () => {
    logoutUserController();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FF] ">
      <AsideDashboard
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menu={DataMenuDashboard}
        handleLogOut={handleLogOut}
      />

      {/* Main */}
      <main className="flex-1 flex flex-col lg:ml-[280px] transition-all duration-300">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-8 h-8 text-[#261CC1]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <h1 className="font-bold text-lg text-[#261CC1]">
            Petunjuk Penggunaan Admin Dashboard
          </h1>
        </header>
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-gray-800 font-bold text-xl">
              <p>Halo, {name} </p>
            </div>

            <p className="text-gray-600 mb-8">
              Role kamu sekarang adalah{" "}
              <span className="font-semibold">{role}</span>
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">
                    Total Pertanyaan sudah Dijawab
                  </h3>
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalSudah}
                </h3>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">
                    Total Pertanyaan sedang Diproses
                  </h3>
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 1h-6"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {totalBelum}
                </h3>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">
                    {user?.role === "MASTER"
                      ? "Total Users"
                      : "Total Jawaban Terkirim"}
                  </h3>

                  <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800">
                  {user?.role === "MASTER" ? totalUsers : totalJawaban}
                </h3>
              </div>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
