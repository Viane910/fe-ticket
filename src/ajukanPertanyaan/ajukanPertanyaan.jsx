import { useState } from "react";
import DataKategori from "../data/data-kategori";
import AjukanPertanyaanController from "./ajukanPertanyaanController";

export default function AjukanPertanyaan() {
  const { ticketing, form, setForm, handleSubmit } =
    AjukanPertanyaanController();
  const [kategori, setKategori] = useState("");
  const [errors, setErrors] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    if (!form.message.trim()) newErrors.message = "Pertanyaan wajib diisi";
    if (!form.categoryId) newErrors.categoryId = "Kategori wajib dipilih";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#008BFF] to-[#3B0270]">
      <div className="max-w-6xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white flex flex-col lg:flex-row">
        {/* LEFT */}
        <div className="lg:w-5/12 bg-[#E4FF30] text-[#515153] p-10 md:p-14 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="font-bold text-3xl text-center md:text-4xl mb-6">
              Video Profil
            </h3>
            <div>
              <iframe
                className="w-full h-64 md:h-80 rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/HPi7JMeSfLA?start=1"
                title="Video Profil BP2TL Jakarta"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Social */}
          <div className="relative z-10 mt-12 flex justify-center gap-4">
            <a
              href="https://www.youtube.com/channel/UChuM2pidVxNGJN3_H8uF_aA"
              className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
            >
              <svg
                className="w-6 h-6 text-[#1877F2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/bp2tljakarta/"
              className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
            >
              <svg
                className="w-6 h-6 text-[#1877F2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=6281114020347&text&type=phone_number&app_absent=0"
              className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
            >
              <svg
                className="w-6 h-6 text-[#1877F2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://x.com/bpptljakarta?lang=en"
              className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
            >
              <svg
                className="w-6 h-6 text-[#1877F2]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-7/12 p-10 md:p-14 bg-white relative">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#008BFF] to-[#3B0270] bg-clip-text text-transparent text-center mb-2">
            Ajukan Pertanyaan
          </h2>

          <p className="text-gray-500 mb-8 text-center font-medium">
            Pertanyaan Tentang Diklat, Pelatihan, TOT, dan lain-lain.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-600"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Nama Pengguna"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border"
                />
                <p className="text-red-500 text-sm">{errors.name}</p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="Email Aktif Pengguna"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border"
                />
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-gray-600"
              >
                Pertanyaanmu
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows="4"
                placeholder="Tuliskan Pertanyaanmu disini..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border"
              />
              <p className="text-red-500 text-sm">{errors.message}</p>
            </div>

            {/* 🔥 DROPDOWN */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">
                Kategori Pertanyaan
              </label>

              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border"
              >
                <option value="">Pilih Kategori</option>

                {DataKategori.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.categoryId}</p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (!validate()) return;
                  handleSubmit();
                }}
                alert="Pertanyaan berhasil diajukan!"
                className="w-full md:w-auto bg-blue-900 text-[#f1f1f1] py-4 px-8 rounded-xl"
              >
                Kirim Pertanyaan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
