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
    if (!form.name.trim()) {
      toast.error("Nama wajib diisi");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email wajib diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Email tidak valid");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Pertanyaan wajib diisi");
      return;
    }

    if (!form.categoryId) {
      toast.error("Kategori wajib dipilih");
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
