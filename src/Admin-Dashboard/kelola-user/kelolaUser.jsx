import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataMenuDashboard } from "../../data/data-menu-dashboard";
import AsideDashboard from "../../components/asideDashboard";
import { logoutUserController } from "../dashboardAdmin/loginController";
import useUserController from "./kelola.user.controller";

export default function KelolaUser() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div>Silakan login terlebih dahulu</div>;
  }

  if (user.role !== "MASTER") {
    return <div>403 - Akses hanya untuk MASTER</div>;
  }

  const {
    users,
    form,
    editId,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
  } = useUserController();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

      <section className="flex flex-col lg:ml-[280px] transition-all duration-300 bg-[#F6F5F5] min-h-screen">
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
            Kelola User Admin
          </h1>
        </header>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* FORM */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="w-full md:w-72 bg-white rounded-xl shadow-md">
              <div className="bg-[#3B2CA3] text-white px-4 py-2 font-semibold">
                Username
              </div>
              <div className="p-4">
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Tulis disini"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="w-full md:w-72 bg-white rounded-xl shadow-md">
              <div className="bg-[#3B2CA3] text-white px-4 py-2 font-semibold">
                Nama
              </div>
              <div className="p-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tulis disini"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="w-full md:w-72 bg-white rounded-xl shadow-md">
              <div className="bg-[#3B2CA3] text-white px-4 py-2 font-semibold">
                Password
              </div>
              <div className="p-4">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Tulis disini"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleSubmit}
                className="bg-[#5CE227] px-6 py-2 rounded-lg font-semibold"
              >
                {editId ? "Update" : "Simpan"}
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white shadow rounded overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-600">
                <tr>
                  <th className="p-3 text-gray-100">No</th>
                  <th className="p-3 text-gray-100">Username</th>
                  <th className="p-3 text-gray-100">Nama</th>
                  <th className="p-3 text-gray-100">Role</th>
                  <th className="p-3 text-gray-100">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u, index) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{u.username}</td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3 flex gap-2">
                      {u.role !== "MASTER" && (
                        <>
                          <button
                            onClick={() => handleEdit(u)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(u.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
          </div>
        </div>
      </section>
    </>
  );
}