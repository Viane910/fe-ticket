import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../API/serviceAPI";

export default function TicketingPertanyaanBisproController() {
  const [ticketing, setTicketing] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // =========================
  // GET TICKETING (ONLY MY)
  // =========================
  const fetchTicketing = async () => {
    try {
      const res = await api.get("/ticketing");

      const myTickets = res.data.data.filter(
        (t) =>
          String(t.assignedToId) === String(user.id) &&
          t.status !== "Sudah Dijawab", // 🔥 INI PENTING
      );

      setTicketing(myTickets);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTicketing();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleResponseChange = (ticketId, value) => {
    setResponseData((prev) => ({
      ...prev,
      [ticketId]: value,
    }));
  };

  // =========================
  // SAVE RESPONSE
  // =========================
  const handleResponseSave = async (ticketId) => {
    const response = responseData[ticketId];

    if (!response || !response.trim()) {
      toast.error("Jawaban tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);

      await api.patch(`/ticketing/${ticketId}/respond`, {
        response,
      });

      toast.success("Jawaban berhasil dikirim!");

      // 🔥 refresh dari backend
      await fetchTicketing();

      setTimeout(() => {
        navigate("/ticketing/terjawab");
      }, 1500);
    } catch (err) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((e) => {
          toast.error(e.msg);
        });
      } else {
        toast.error(err.response?.data?.message || "Gagal mengirim jawaban");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    ticketing,
    responseData,
    loading,
    handleResponseChange,
    handleResponseSave,
    user,
  };
}
