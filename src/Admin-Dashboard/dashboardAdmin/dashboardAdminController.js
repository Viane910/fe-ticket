import { useEffect, useState } from "react";
import api from "../../API/serviceAPI";

export default function DashboardAdminController() {
  const [totalBelum, setTotalBelum] = useState(0);
  const [totalSudah, setTotalSudah] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJawaban, setTotalJawaban] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // FETCH DATA
  // =========================
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // 🔥 ambil ticket
      const ticketRes = await api.get("/ticketing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const myTickets = ticketRes.data.data;

      const belum = myTickets.filter(
        (t) => t.status === "Belum Dikelola",
      ).length;

      const sudah = myTickets.filter(
        (t) => t.status === "Sudah Dijawab",
      ).length;

      const jawaban = myTickets.filter(
        (t) => t.status === "Sudah Dijawab",
      ).length;

      setTotalJawaban(jawaban);
      setTotalBelum(belum);
      setTotalSudah(sudah);

      if (user.role === "MASTER") {
        const userRes = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const users = Array.isArray(userRes.data)
          ? userRes.data
          : userRes.data.data;

        setTotalUsers(users.length);
      }

      // 🔥 ambil user
      const userRes = await api.get("/users");
      const users = Array.isArray(userRes.data)
        ? userRes.data
        : userRes.data.data;

      setTotalUsers(users.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    totalBelum,
    totalSudah,
    totalUsers,
    totalJawaban,
    user,
  };
}
