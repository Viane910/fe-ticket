import { useEffect, useState } from "react";
import api from "../../API/serviceAPI";

export default function PetunjukPenggunaanAdminController() {
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);
  const [editFilename, setEditFilename] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchFiles = async () => {
    const res = await api.get("/files");
    setFiles(res.data.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!newFile) {
      alert("Pilih file dulu!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", newFile);

      await api.post("/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewFile(null);
      fetchFiles();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Upload gagal");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/file/${id}`);
      fetchFiles();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Delete gagal");
    }
  };

  const handleEdit = async () => {
    try {
      await api.put(`/file/${editId}`, { filename: editFilename });
      setEditId(null);
      fetchFiles();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Edit gagal");
    }
  };

  const setActiveFile = async (id) => {
    try {
      await api.put(`/files/${id}/active`);
      fetchFiles();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Gagal mengatur file sebagai aktif");
    }
  };

  // 🔥 RETURN HARUS DI DALAM FUNCTION
  return {
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
  };
}
