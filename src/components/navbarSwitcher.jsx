import { useEffect, useState } from "react";
import Header from "../components/header";
import HeaderScrolls from "../components/header-scrolls";

export default function NavbarSwitcher() {
  const [scrolled, setScrolled] = useState(false);

  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar default */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "opacity-0 -translate-y-5 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <Header />
      </div>

      {/* Navbar saat scroll */}
      <div
        className={`absolute top-0 left-0 w-full flex justify-center transition-all duration-500 ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <HeaderScrolls activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>
    </div>
  );
}
