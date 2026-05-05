import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AsideDashboard from "../../components/asideDashboard";
import { logoutUserController } from "../dashboardAdmin/loginController";
import KelolaPertanyaanController from "./kelolaPertanyaanController";

import {
  DataMenuDashboardMaster,
  DataMenuDashboardAdminBispro,
} from "../../data/data-menu-dashboard";

export default function KelolaPertanyaan() {
  const {
    ticketing,
    adminList,
    editedData,
    handleAssign,
    handleCategoryChange,
    handleSave,
    handleDelete,
  } = KelolaPertanyaanController();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState({});
  const [editingAssign, setEditingAssign] = useState({});
  const [expandedMessage, setExpandedMessage] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const CATEGORY_OPTIONS = [
    { id: 1, category: "Pendaftaran" },
    { id: 2, category: "Pembayaran" },
    { id: 3, category: "Diklat" },
    { id: 4, category: "Lainnya" },
  ];

  const filteredData = ticketing.filter((item) => {
    const keyword = searchTerm.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.message?.toLowerCase().includes(keyword)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const menu =
    user?.role === "MASTER"
      ? DataMenuDashboardMaster
      : DataMenuDashboardAdminBispro;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleLogOut = () => {
    logoutUserController();
    navigate("/login");
  };

  return (
    <>
      <AsideDashboard
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menu={menu}
        handleLogOut={handleLogOut}
      />

      <main className="flex-1 flex flex-col lg:ml-[280px] bg-[#F6F5F5] min-h-screen">
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-6 border-b bg-[#FEFBF6]">
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-8 h-8 text-[#261CC1]" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>

          <h1 className="font-bold text-lg text-[#261CC1]">
            Kelola Pertanyaan
          </h1>
        </header>

        {/* SEARCH */}
        <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
          <div className="flex justify-end">
            <div className="w-full sm:w-80 md:w-96">
              <input
                type="search"
                placeholder="Cari nama, email, atau pertanyaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white h-10 sm:h-11 w-full px-4 sm:px-5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <section className="p-4 sm:p-6 md:p-8">
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[1000px]">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">No</th>
                  <th className="p-4 text-left font-semibold">Nama</th>
                  <th className="p-4 text-left font-semibold">Email</th>
                  <th className="p-4 text-left font-semibold">Pertanyaan</th>
                  <th className="p-4 text-left font-semibold">Kategori</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Assign</th>
                  <th className="p-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{indexOfFirstItem + index + 1}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-gray-600 text-xs">{item.email}</td>

                    {/* MESSAGE */}
                    <td className="p-4 max-w-md">
                      <p
                        className={`text-gray-700 ${
                          !expandedMessage[item.id] && "line-clamp-2"
                        }`}
                      >
                        {item.message}
                      </p>

                      {item.message.split(" ").length > 20 && (
                        <button
                          onClick={() =>
                            setExpandedMessage((prev) => ({
                              ...prev,
                              [item.id]: !prev[item.id],
                            }))
                          }
                          className="text-blue-600 hover:text-blue-700 text-xs mt-1 font-medium"
                        >
                          {expandedMessage[item.id]
                            ? "Sembunyikan"
                            : "Lihat selengkapnya"}
                        </button>
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4">
                      {editingCategory[item.id] ? (
                        <select
                          className="w-full min-w-[130px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={
                            editedData[item.id]?.categoryId ||
                            item.categoryId ||
                            ""
                          }
                          onChange={(e) =>
                            handleCategoryChange(
                              item.id,
                              e.target.value,
                              CATEGORY_OPTIONS,
                            )
                          }
                        >
                          <option value="">Pilih Kategori</option>
                          {CATEGORY_OPTIONS.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.category}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          onClick={() =>
                            setEditingCategory((p) => ({
                              ...p,
                              [item.id]: true,
                            }))
                          }
                          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          {item.category || "Pilih"}
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full inline-block whitespace-nowrap ${
                          item.status === "Sudah Dijawab"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Diproses"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Belum Dikelola"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ASSIGN */}
                    <td className="p-4">
                      {editingAssign[item.id] ? (
                        <select
                          className="w-full min-w-[130px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={
                            editedData[item.id]?.assignedToId ||
                            item.assignedToId ||
                            ""
                          }
                          onChange={(e) =>
                            handleAssign(item.id, e.target.value)
                          }
                        >
                          <option value="">Pilih Admin</option>
                          {adminList.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name || a.username}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          onClick={() =>
                            setEditingAssign((p) => ({ ...p, [item.id]: true }))
                          }
                          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          {item.assignedTo || "-"}
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="p-4">
                      <div className="flex gap-2 justify-center items-center">
                        {item.status !== "Sudah Dijawab" && (
                          <button
                            onClick={() => handleSave(item.id)}
                            className="px-4 py-2 text-xs font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          >
                            Simpan
                          </button>
                        )}

                        {user?.role === "MASTER" && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 text-xs font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
            {/* EMPTY STATE */}
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-500 font-medium">
                  Data tidak ditemukan
                </p>
              </div>
            )}
          </div>

          {/* MOBILE & TABLET CARD */}
          <div className="lg:hidden space-y-4">
            {currentData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-xl shadow-md space-y-3 border border-gray-100"
              >
                {/* Number Badge */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
                    {indexOfFirstItem + index + 1}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Sudah Dijawab"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Diproses"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "Belum Dikelola"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                {/* User Info */}
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h2 className="font-bold text-base text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-xs text-gray-500 break-all mt-1">
                    {item.email}
                  </p>
                </div>

                {/* Message */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Pertanyaan:
                  </p>
                  <p
                    className={`text-sm text-gray-700 ${
                      !expandedMessage[item.id] && "line-clamp-3"
                    }`}
                  >
                    {item.message}
                  </p>

                  {item.message.split(" ").length > 20 && (
                    <button
                      onClick={() =>
                        setExpandedMessage((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className="text-blue-600 hover:text-blue-700 text-xs mt-2 font-medium"
                    >
                      {expandedMessage[item.id]
                        ? "Sembunyikan"
                        : "Lihat selengkapnya"}
                    </button>
                  )}
                </div>

                {/* Category & Assign Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* CATEGORY EDIT */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Kategori
                  </label>
                  {editingCategory[item.id] ? (
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={
                        editedData[item.id]?.categoryId || item.categoryId || ""
                      }
                      onChange={(e) =>
                        handleCategoryChange(
                          item.id,
                          e.target.value,
                          CATEGORY_OPTIONS,
                        )
                      }
                    >
                      <option value="">Pilih Kategori</option>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p
                      onClick={() =>
                        setEditingCategory((p) => ({ ...p, [item.id]: true }))
                      }
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline"
                    >
                      {item.category || "Pilih Kategori"}
                    </p>
                  )}
                  </div>

                  {/* ASSIGN EDIT */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Assign ke
                  </label>
                  {editingAssign[item.id] ? (
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={
                        editedData[item.id]?.assignedToId ||
                        item.assignedToId ||
                        ""
                      }
                      onChange={(e) => handleAssign(item.id, e.target.value)}
                    >
                      <option value="">Pilih Admin</option>
                      {adminList.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name || a.username}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p
                      onClick={() =>
                        setEditingAssign((p) => ({ ...p, [item.id]: true }))
                      }
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline"
                    >
                      {item.assignedTo || "Belum di-assign"}
                    </p>
                  )}
                </div>
                </div>

                {/* ACTION */}
                <div className="flex gap-2 pt-2">
                  {item.status !== "Sudah Dijawab" && (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Simpan
                    </button>
                  )}

                  {user?.role === "MASTER" && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-500 font-medium">
                  Data tidak ditemukan
                </p>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {filteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 pb-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Halaman
                </span>
                <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-semibold text-sm">
                  {currentPage}
                </span>
                <span className="text-sm text-gray-500">dari</span>
                <span className="text-sm font-medium text-gray-700">
                  {totalPages}
                </span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
