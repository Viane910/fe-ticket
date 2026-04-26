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

      <main className="flex-1 flex flex-col lg:ml-[280px] bg-gray-100 min-h-screen">
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 bg-[#f1f1f1] border-b shadow-sm">
          {user?.role === "MASTER" && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <svg
                className="w-6 h-6 text-[#261CC1]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          <h1 className="font-semibold text-sm sm:text-base md:text-lg text-[#261CC1]">
            Kelola Pertanyaan
          </h1>
        </header>

        {/* SEARCH */}
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
          <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="p-3">No</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Pertanyaan</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assign</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{indexOfFirstItem + index + 1}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-gray-600">{item.email}</td>

                    {/* MESSAGE */}
                    <td className="p-3 max-w-xs">
                      <p
                        className={`${
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
                          className="text-blue-500 text-xs mt-1"
                        >
                          {expandedMessage[item.id]
                            ? "Sembunyikan"
                            : "Lihat selengkapnya"}
                        </button>
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="p-2">
                      {editingCategory[item.id] ? (
                        <select
                          className="w-full min-w-[120px] max-w-[180px] border rounded px-2 py-1 text-xs sm:text-sm"
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
                          <option value="">Pilih</option>
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
                          className="cursor-pointer text-blue-600"
                        >
                          {item.category || "Pilih"}
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-center text-xs font-medium rounded-full inline-block ${
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
                    <td className="p-2">
                      {editingAssign[item.id] ? (
                        <select
                          className="w-full min-w-[120px] max-w-[180px] border rounded px-2 py-1 text-xs sm:text-sm"
                          value={
                            editedData[item.id]?.assignedToId ||
                            item.assignedToId ||
                            ""
                          }
                          onChange={(e) =>
                            handleAssign(item.id, e.target.value)
                          }
                        >
                          <option value="">Pilih</option>
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
                          className="cursor-pointer text-blue-600"
                        >
                          {item.assignedTo || "-"}
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="p-3 flex gap-2 justify-center items-center">
                      {item.status !== "Sudah Dijawab" && (
                        <button
                          onClick={() => handleSave(item.id)}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded"
                        >
                          Simpan
                        </button>
                      )}

                      {user?.role === "MASTER" && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
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
            {currentData.map((item) => (
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
                  className={`text-sm mt-2 ${
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
                    className="text-blue-500 text-xs mt-1"
                  >
                    {expandedMessage[item.id]
                      ? "Sembunyikan"
                      : "Lihat selengkapnya"}
                  </button>
                )}

                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
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

                {/* CATEGORY EDIT */}
                <div>
                  <label className="text-xs text-gray-500">Kategori</label>
                  {editingCategory[item.id] ? (
                    <select
                      className="w-full mt-1 border rounded px-2 py-1 text-sm"
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
                      <option value="">Pilih</option>
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
                      className="text-blue-600 text-sm"
                    >
                      {item.category || "Pilih"}
                    </p>
                  )}
                </div>

                {/* ASSIGN EDIT */}
                <div>
                  <label className="text-xs text-gray-500">Assign</label>
                  {editingAssign[item.id] ? (
                    <select
                      className="w-full mt-1 border rounded px-2 py-1 text-sm"
                      value={
                        editedData[item.id]?.assignedToId ||
                        item.assignedToId ||
                        ""
                      }
                      onChange={(e) => handleAssign(item.id, e.target.value)}
                    >
                      <option value="">Pilih</option>
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
                      className="text-blue-600 text-sm"
                    >
                      {item.assignedTo || "-"}
                    </p>
                  )}
                </div>

                {/* ACTION */}
                <div className="flex gap-2">
                  {item.status !== "Sudah Dijawab" && (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="flex-1 bg-green-500 text-white py-1 rounded text-sm"
                    >
                      Simpan
                    </button>
                  )}

                  {user?.role === "MASTER" && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <p className="text-center text-gray-400 py-6">
                Data tidak ditemukan
              </p>
            )}
          </div>
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
