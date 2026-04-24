import { useEffect, useState } from "react";
import api from "../API/serviceAPI";

const getTicketing = () => api.get("/ticketing");
const postTicket = (data) => api.post("/ticketing", data);

export default function AjukanPertanyaanController() {
  const [ticketing, setTicketing] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    categoryId: "",
  });

  const fetchTicketing = async () => {
    try {
      const res = await getTicketing();
      setTicketing(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTicketing();
  }, []);

  const handleSubmit = async () => {
    if (!form.categoryId) {
      alert("Pilih kategori dulu!");
      return;
    }
    try {
      await postTicket(form);

      setForm({
        name: "",
        email: "",
        message: "",
        categoryId: "",
      });

      alert("Pertanyaan berhasil diajukan!");
      fetchTicketing();
    } catch (err) {
      alert("Gagal mengajukan pertanyaan.");
    }
  };

  return {
    ticketing,
    form,
    setForm,
    handleSubmit,
  };
}
