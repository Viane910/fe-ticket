import { useEffect, useState } from "react";

// Navbar
import { useNavigate } from "react-router-dom";
import { DataMenuDashboard } from "../../data/data-menu-dashboard";
import AsideDashboard from "../../components/asideDashboard";
import { logoutUserController } from "../dashboardAdmin/loginController";

// Controller
import PetunjukPenggunaanAdminController from "./petunjukPenggunaanAdminController";

// port
const BASE_URL = import.meta.env.VITE_API_URL;

export default function PetunjukPenggunaanAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const navigate = useNavigate();
  const handleLogOut = () => {
    logoutUserController();
    navigate("/login");
  };

  // Controller
  const {
    files,
    newFile,
    setNewFile,
    handleUpload,
    handleDelete,
    editId,
    setEditId,
    editFilename,
    setEditFilename,
    handleEdit,
    setActiveFile,
  } = PetunjukPenggunaanAdminController();

  return (
    <>
      <AsideDashboard
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menu={DataMenuDashboard}
        handleLogOut={handleLogOut}
      />

      <main className="flex-1 flex flex-col lg:ml-[280px] transition-all duration-300">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b bg-white">
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-8 h-8 text-[#261CC1]"
              xmlns="http://www.w3.org/2000/svg"
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

          <h1 className="font-bold text-base md:text-lg text-[#261CC1] lg:text-left sm:text-right flex-1">
            Kelola Petunjuk Penggunaan
          </h1>
        </header>

        <section className="p-4 md:p-6 space-y-6">
          <h1 className="text-2xl font-bold">
            Kelola File PDF Petunjuk Penggunaan User
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="file"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />

            <button
              onClick={handleUpload}
              className="bg-[#261CC1] text-white px-4 py-2 rounded-md hover:bg-[#1a0f8c] w-full sm:w-auto"
            >
              Upload File
            </button>
          </div>

          {/* 📋 List File */}
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">No</th>
                  <th className="p-3 text-left">Nama File</th>
                  <th className="p-3 text-left">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {files.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center p-4">
                      Tidak ada file
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr key={file.id} className="border-t">
                      <td className="p-3">{index + 1}</td>

                      <td className="p-3 break-words max-w-[150px] md:max-w-none">
                        {editId === file.id ? (
                          <input
                            value={editFilename}
                            onChange={(e) => setEditFilename(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          file.filename
                        )}
                      </td>

                      <td className="p-3 flex flex-wrap gap-2">
                        <button onClick={() => setPreviewFile(file)}>
                          <svg
                            className="w-6 h-6 text-blue-600 hover:text-blue-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>

                        {editId === file.id ? (
                          <svg
                            className="w-6 h-6 text-yellow-600 hover:text-yellow-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                            />
                          </svg>
                        ) : (
                          <button
                            onClick={() => {
                              setEditId(file.id);
                              setEditFilename(file.filename);
                            }}
                          >
                            <svg
                              className="w-6 h-6 text-yellow-600 hover:text-yellow-800"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}

                        <button onClick={() => handleDelete(file.id)}>
                          <svg
                            className="w-6 h-6 text-red-600 hover:text-red-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                            />
                          </svg>
                        </button>

                        <button
                          className="justify-center"
                          onClick={() => setActiveFile(file.id)}
                        >
                          <svg
                            className="w-6 h-6 text-green-500"
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
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 3v4a1 1 0 0 1-1 1H5m4 6 2 2 4-4m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                            />
                          </svg>
                        </button>
                        {file.isActive && (
                          <span className="text-green-600 text-xs ml-2">
                            (Aktif)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="p-4 m-4 ">
          <h2 className="text-[#261CC1] text-2xl font-bold">Preview File</h2>
          {previewFile && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">
                Preview: {previewFile.filename}
              </h2>

              <iframe src={previewFile.filepath} className="w-full h-[600px]" />
            </div>
          )}
        </section>
      </main>
    </>
  );
}
