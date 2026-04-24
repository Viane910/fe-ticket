import { useState, useEffect, useRef } from "react";
import HeaderScrolls from "../components/header-scrolls";
import BackgroundPicture from "../assets/pictures/page-title.jpg";
import LeftImage from "../assets/pictures/profil.jpg";
import RightImage from "../assets/pictures/32.jpg";
import LogoAll from "../assets/pictures/logo.png";
import DataTeam from "../data/data-developer";

export default function Tentang() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={BackgroundPicture}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/85"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full mt-20 px-4 py-12">
          {/* Title */}
          <h1
            ref={ref}
            className={`text-2xl md:text-3xl font-bold text-[#0A0653] leading-relaxed mb-10 ${
              show ? "focus-in-expand" : "opacity-0"
            }`}
          >
            Tentang Layanan Ticketing <br />
            Balai Pendidikan Pelatihan Transportasi Laut Jakarta
          </h1>

          {/* Main Section */}
          <div className=" flex items-center justify-center gap-6 flex-wrap md:flex-nowrap">
            {/* Left Image */}
            <div className="transform -rotate-12 bg-gradient-to-br from-blue-500 to-purple-700 p-2 rounded-2xl shadow-lg">
              <img
                src={LeftImage}
                alt="Left"
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>

            {/* Logos */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <img src={LogoAll} alt="logo1" className="h-20" />
            </div>

            {/* Right Image */}
            <div className="transform rotate-12 bg-gradient-to-br from-blue-500 to-purple-700 p-2 rounded-2xl shadow-lg">
              <img
                src={RightImage}
                alt="Right"
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Description */}
          <p className="mt-10 text-base md:text-lg font-medium text-[#44426F] max-w-3xl mx-auto leading-relaxed">
            Layanan Ticketing merupakan sistem layanan bantuan (helpdesk) yang
            dikembangkan oleh Balai Pendidikan dan Pelatihan Transportasi Laut
            Jakarta untuk mempermudah penyampaian informasi, pertanyaan, serta
            pengaduan dari peserta diklat, alumni, maupun masyarakat umum.
            Melalui sistem ini, setiap permintaan layanan akan tercatat secara
            terstruktur dalam bentuk tiket, sehingga dapat ditindaklanjuti
            dengan lebih cepat, tepat, dan transparan.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 mb-10">
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Developer Team
            </h2>
          </div>

          {/* GRID */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                    gap-y-6 gap-x-4 sm:gap-x-6 
                    mt-8 sm:mt-10"
          >
            {DataTeam.map((item, index) => (
              <div
                key={index}
                className="text-center max-w-[160px] w-full mx-auto"
              >
                {/* IMAGE */}
                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 
                         object-cover rounded-full"
                  />
                </div>

                {/* NAME */}
                <p className="mt-3 text-sm sm:text-base font-semibold text-gray-900">
                  {item.name}
                </p>

                {/* ROLE */}
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
