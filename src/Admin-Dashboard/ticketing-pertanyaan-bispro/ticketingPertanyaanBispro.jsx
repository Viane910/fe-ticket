import { useEffect, useState } from "react";
import { DataMenuDashboardAdminBispro } from "../../data/data-menu-dashboard";
import { useNavigate } from "react-router-dom";
import AsideDashboard from "../../components/asideDashboard";
import { logoutUserController } from "../dashboardAdmin/loginController";
import TicketingPertanyaanBisproController from "./ticketing.pertanyaan.bispro";
import { Toaster } from "react-hot-toast";

const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

// =========================
// AUTH CHECK
// =========================
function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
}

export default function TicketingPertanyaanBispro() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  useAuth();

  const {
    ticketing,
    responseData,
    loading,
    handleResponseChange,
    handleResponseSave,
    user,
  } = TicketingPertanyaanBisproController();

  const filteredData = ticketing.filter((item) => {
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
      <Toaster />
      <AsideDashboard
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menu={DataMenuDashboardAdminBispro}
        handleLogOut={handleLogOut}
      />
      <main className="flex-1 flex flex-col lg:ml-[280px] bg-[#F6F5F5] min-h-screen">
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 border-b bg-[#FEFBF6]">
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#261CC1]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <h1 className="font-semibold text-sm sm:text-base md:text-lg text-[#261CC1]">
            Pertanyaan Baru Ticketing
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

        {/* CONTENT */}
        <section className="p-3 sm:p-4 md:p-6">
          {/* DESKTOP TABLE */}
          <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Pertanyaan</th>
                  <th className="p-3 text-left">Jawaban</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => {
                  const isOwner = String(item.assignedToId) === String(user.id);

                  return (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-gray-600">{item.email}</td>

                      {/* PERTANYAAN */}
                      <td className="p-3 max-w-xs">
                        <p
                          className={`${!expandedMessage[item.id] && "line-clamp-2"}`}
                        >
                          {item.message}
                        </p>
                      </td>

                      {/* JAWABAN */}
                      <td className="p-3">
                        {isOwner ? (
                          <>
                            <textarea
                              className="w-full border rounded p-2 text-xs"
                              value={
                                responseData[item.id] ?? item.response ?? ""
                              }
                              onChange={(e) =>
                                handleResponseChange(item.id, e.target.value)
                              }
                            />

                            <button
                              onClick={() => handleResponseSave(item.id)}
                              className="mt-1 px-2 py-1 text-xs bg-blue-500 text-white rounded"
                            >
                              Kirim
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            Bukan milik Anda
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* EMPTY STATE */}
            {filteredData.length === 0 && (
              <p className="text-center text-gray-400 py-6">
                Data tidak ditemukan
              </p>
            )}
          </div>

          {/* MOBILE CARD */}
          <div className="md:hidden space-y-4">
            {filteredData.map((item) => {
              const isOwner = String(item.assignedToId) === String(user.id);

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow space-y-3"
                >
                  <div>
                    <h2 className="font-semibold text-sm">{item.name}</h2>
                    <p className="text-xs text-gray-500 break-all">
                      {item.email}
                    </p>
                  </div>

                  <p
                    className={`text-sm text-gray-600 ${!expandedMessage[item.id] && "line-clamp-3"}`}
                  >
                    {item.message}
                  </p>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Jawaban</p>

                    {isOwner ? (
                      <>
                        <textarea
                          className="w-full border rounded p-2 text-sm"
                          value={responseData[item.id] ?? item.response ?? ""}
                          onChange={(e) =>
                            handleResponseChange(item.id, e.target.value)
                          }
                        />

                        <button
                          onClick={() => handleResponseSave(item.id)}
                          className="mt-2 w-full bg-blue-500 text-white py-1 rounded text-sm"
                        >
                          Kirim
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        Bukan milik Anda
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* EMPTY STATE MOBILE */}
            {filteredData.length === 0 && (
              <p className="text-center text-gray-400 py-6">
                Data tidak ditemukan
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
