import { useEffect, useState } from "react";
import api from "../API/serviceAPI";
import toast from "react-hot-toast";

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
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim() ||
      !form.categoryId
    ) {
      toast.error("Semua field wajib diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast.error("Email tidak valid");
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

      toast.success("Pertanyaan berhasil diajukan!");
      fetchTicketing();
    } catch (err) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((e) => {
          toast.error(e.msg);
        });
      } else {
        toast.error(err.response?.data?.message || "Terjadi kesalahan");
      }
    }
  };

  return {
    ticketing,
    form,
    setForm,
    handleSubmit,
  };
}
