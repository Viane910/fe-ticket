import { useEffect, useState } from "react";
import api from "../../API/serviceAPI";

// Import Asidebar
import { DataMenuDashboard } from "../../data/data-menu-dashboard";
import { useNavigate } from "react-router-dom";
import AsideDashboard from "../../components/asideDashboard";
import { logoutUserController } from "../dashboardAdmin/loginController";

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
}

export default function TicketingTerjawab() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/ticketing");

        const historyTickets = res.data.data.filter(
          (t) =>
            String(t.assignedToId) === String(user.id) &&
            t.status === "Sudah Dijawab",
        );

        setData(historyTickets);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const keyword = searchTerm.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.message?.toLowerCase().includes(keyword)
    );
  });

  const handleLogOut = () => {
    logoutUserController();
    navigate("/login");
  };

  return (
    <>
      <AsideDashboard
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menu={DataMenuDashboard}
        handleLogOut={handleLogOut}
      />
      <main className="flex-1 flex flex-col lg:ml-[280px] bg-[#F6F5F5] min-h-screen">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-[#FEFBF6]">
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
            Pertanyaan yang telah Terjawab di Ticketing
          </h1>
        </header>

        <div className="px-3 sm:px-4 md:px-6 flex justify-center md:justify-end">
          <div className="w-full max-w-xs sm:max-w-sm md:w-80 h-10 mt-6 mb-2">
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white h-10 w-full px-4 rounded-full text-sm focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-sm">Belum ada pertanyaan</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredData.map((t) => {
                const initials = t.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={t.id}
                    className="relative bg-white rounded-2xl shadow-md 
                       hover:shadow-xl transition-all duration-300 
                       overflow-hidden group"
                  >
                    {/* ACCENT BAR */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    <div className="p-5 sm:p-6 space-y-4">
                      {/* HEADER */}
                      <div className="flex items-center justify-between">
                        {/* USER */}
                        <div className="flex items-center gap-3">
                          {/* AVATAR */}
                          <div
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                                  text-white flex items-center justify-center font-bold text-sm shadow"
                          >
                            {initials}
                          </div>

                          <div>
                            <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                              {t.name}
                            </h2>
                            <p className="text-xs text-gray-400">{t.email}</p>
                          </div>
                        </div>

                        {/* STATUS */}
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${
                            t.status === "Sudah Dijawab"
                              ? "bg-green-100 text-green-700"
                              : t.status === "Diproses"
                                ? "bg-yellow-100 text-yellow-700"
                                : t.status === "Belum Dikelola"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>

                      {/* PERTANYAAN */}
                      <div className="bg-gray-50 rounded-xl p-4 border">
                        <p className="text-xs uppercase text-gray-400 mb-1 tracking-wide">
                          Pertanyaan
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {t.message}
                        </p>
                      </div>

                      {/* JAWABAN */}
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-dashed">
                        <p className="text-xs uppercase text-gray-400 mb-1 tracking-wide">
                          Jawaban
                        </p>
                        <p className="text-sm sm:text-base text-gray-800">
                          {t.response ? (
                            t.response
                          ) : (
                            <span className="text-gray-400 italic">
                              Belum ada jawaban
                            </span>
                          )}
                        </p>
                      </div>

                      {/* FOOTER ACTION */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-400">
                          ID: {t.id}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
