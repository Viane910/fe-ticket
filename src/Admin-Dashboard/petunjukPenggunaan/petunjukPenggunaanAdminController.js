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
    const formData = new FormData();
    formData.append("file", newFile);

    await api.post("/upload_file", formData);
    fetchFiles();
  };

  const handleDelete = async (id) => {
    await api.delete(`/file/${id}`);
    fetchFiles();
  };

  const handleEdit = async () => {
    await api.put(`/file/${editId}`, { filename: editFilename });
    setEditId(null);
    fetchFiles();
  };

  const setActiveFile = async (id) => {
    await api.put(`/files/${id}/active`);
    fetchFiles();
  };

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
