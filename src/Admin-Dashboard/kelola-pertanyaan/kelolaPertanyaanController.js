import { useEffect, useState } from "react";
import api from "../../API/serviceAPI";

export default function KelolaPertanyaanController() {
  const [ticketing, setTicketing] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [adminList, setAdminList] = useState([]);

  const token = localStorage.getItem("token");

  // =========================
  // GET TICKETING
  // =========================
  const fetchTicketing = async () => {
    try {
      const res = await api.get("/ticketing");
      setTicketing(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // GET ADMIN
  // =========================
  const fetchAdmins = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = Array.isArray(res.data) ? res.data : res.data.data;

      setAdminList(
        users.filter((u) => u.role?.toUpperCase() === "ADMIN_BISPRO"),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTicketing();
    fetchAdmins();
  }, []);

  // =========================
  // EDIT ASSIGN (LOCAL)
  // =========================
  const handleAssign = (ticketId, userId) => {
    const selectedAdmin = adminList.find(
      (a) => String(a.id) === String(userId),
    );

    setEditedData((prev) => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        assignedToId: Number(userId),
        assignedTo: selectedAdmin?.name || selectedAdmin?.username,
      },
    }));
  };

  // =========================
  // EDIT CATEGORY (LOCAL)
  // =========================
  const handleCategoryChange = (ticketId, categoryId, categories) => {
    const selected = categories.find((c) => c.id == categoryId);

    setEditedData((prev) => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        categoryId: Number(categoryId),
        category: selected?.category || "", // ✅ AMAN
      },
    }));
  };

  // =========================
  // SAVE (API HIT)
  // =========================
  const handleSave = async (ticketId) => {
    const data = editedData[ticketId];
    if (!data) return;

    try {
      // update category
      if (data.categoryId) {
        await api.patch(`/ticketing/${ticketId}/category`, {
          categoryId: data.categoryId,
        });
      }

      await fetchTicketing();

      // update assign
      if (data.assignedToId) {
        await api.patch(`/ticketing/${ticketId}/assign`, {
          assignedToId: data.assignedToId,
        });
      }

      // update UI
      setTicketing((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? {
                ...t,
                ...data,
                // status: "Sudah Dikelola",
              }
            : t,
        ),
      );

      // clear edited
      setEditedData((prev) => {
        const newData = { ...prev };
        delete newData[ticketId];
        return newData;
      });
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // DELETE TICKET
  // =========================
  const handleDelete = async (ticketId) => {
    try {
      const confirmDelete = window.confirm("Yakin ingin menghapus ticket ini?");

      if (!confirmDelete) return;

      console.log("DELETE:", ticketId);

      await api.delete(`/ticketing/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTicketing((prev) => prev.filter((t) => t.id !== ticketId));
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err);
      alert("Gagal menghapus ticket");
    }
  };

  return {
    ticketing,
    adminList,
    editedData,
    handleAssign,
    handleCategoryChange,
    handleSave,
    handleDelete,
  };
}
