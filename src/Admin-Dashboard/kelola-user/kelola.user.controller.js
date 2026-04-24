import { useEffect, useState } from "react";
import api from "../../API/serviceAPI";

export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default function useUserController() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    role: "ADMIN_BISPRO",
  });

  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let payload = { ...form };

      if (!payload.password) {
        delete payload.password;
      }

      if (editId) {
        await updateUser(editId, payload);
      } else {
        await createUser(form);
      }

      setForm({
        username: "",
        password: "",
        name: "",
        role: "ADMIN_BISPRO",
      });

      setEditId(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      name: user.name,
      password: "",
      role: user.role,
    });
    setEditId(user.id);
  };

  return {
    users,
    form,
    editId,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
  };
}
