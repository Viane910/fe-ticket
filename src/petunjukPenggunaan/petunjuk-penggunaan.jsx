import BackgroundPicture from "../assets/pictures/page-title.jpg";
import PetunjukPenggunaanUser from "./petunjuk.penggunaan.user";
import Footer from "../components/footer";

export default function PetunjukPenggunaan() {
  const { file } = PetunjukPenggunaanUser();
  const BASE_URL = import.meta.env.VITE_API_URL;

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
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full mt-20 px-4 py-12">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A0653] leading-relaxed mb-10">
            Petunjuk Penggunaan <br />
            Layanan Ticketing untuk User
          </h1>
          {/* PDF */}
          <div className="flex items-center justify-center">
            {file ? (
              <iframe
                src={`${BASE_URL}/${file.filepath}`}
                className="w-full h-[600px]"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
