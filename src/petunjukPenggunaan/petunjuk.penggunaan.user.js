import { useState, useEffect } from "react";
import api from "../API/serviceAPI";

export default function PetunjukPenggunaanController() {
  const [file, setFile] = useState(null);

  const fetchFile = async () => {
    try {
      const res = await api.get("/files/latest");
      setFile(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  return {
    file,
  };
}
