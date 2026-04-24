import LogoAll from "../../assets/pictures/logo.png";
import { loginUserController } from "./loginController";
import { useState } from "react";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUserController({ username, password });

      localStorage.setItem("isLogin", "true");

      alert("Login berhasil");

      window.location.href = "/dashboardAdmin";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-[#008BFF] to-[#3B0270] flex flex-col">
        <div className="absolute top-4 left-4">
          <a href="/" className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            <p className="text-[#E4FF30] font-semibold">Kembali ke Beranda</p>
          </a>
        </div>

        {/* CENTER AREA */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#1E1560]">
            <img src={LogoAll} alt="Logo" className="w-full h-auto" />
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#7EE7FF] to-[#E4FF30] bg-clip-text text-transparent drop-shadow-lg">
              Admin Panel
            </h1>
            <p className="text-center text-[#C3D5E6]">
              Masuk ke dashboard Admin Ticketing BP2TL
            </p>
            <form
              onSubmit={handleSubmit}
              noValidate=""
              action=""
              className="space-y-6"
            >
              <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block text-[#C3D5E6]">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block text-[#C3D5E6]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <button
                type="submit"
                className="block w-full p-3 text-center rounded-base text-[#32373C] bg-[#FFB428]"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
