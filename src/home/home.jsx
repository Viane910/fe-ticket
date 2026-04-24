import NavbarSwitcher from "../components/navbarSwitcher";
import HeroPicture from "../assets/pictures/32.jpg";
import AllLogos from "../assets/pictures/logo.png";
import Tentang from "../tentang/tentang";
import AjukanPertanyaan from "../ajukanPertanyaan/ajukanPertanyaan";
import PetunjukPenggunaan from "../petunjukPenggunaan/petunjuk-penggunaan";
import Chatbot from "../chatbotComponents/chatbot";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <NavbarSwitcher />
      <Chatbot />
      <section
        id="beranda"
        className="pt-28 min-h-screen bg-gradient-to-b from-[#008BFF] to-[#3B0270] flex flex-col justify-between"
      >
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-2 md:px-16 lg:px-12 xl:px-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            <div className="text-[#F1F1F1] max-w-xl text-center lg:text-left">
              <p className="text-sm mb-2 opacity-90">
                Layanan Pengajuan Pertanyaan
              </p>

              <h1 className="tracking-in-expand text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-6">
                Balai Pendidikan <br />
                Pelatihan Transportasi <br />
                Laut (BP2TL) Jakarta
              </h1>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-lg">
              <img
                src={HeroPicture}
                alt="Hero"
                className="w-64 md:w-80 lg:w-96 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <img src={AllLogos} alt="Logos" className="w-32 opacity-80" />
        </div>
      </section>
      <div id="tentang">
        <Tentang />
      </div>
      <div id="ajukan-pertanyaan">
        <AjukanPertanyaan />
      </div>
      <div id="petunjuk">
        <PetunjukPenggunaan />
      </div>
      <div></div>
    </>
  );
}
