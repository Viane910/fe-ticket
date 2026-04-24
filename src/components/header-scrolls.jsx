import { useState } from "react";
import { Link } from "react-router-dom";
import BP2TLImage from "../assets/icons/bp2tl.png";
import DataMenus from "../data/data-menus";

function HeaderScrolls({ activeMenu, setActiveMenu }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full flex justify-center mt-4">
      <div className="relative w-60 bg-[#E4FF30]/90 backdrop-blur-md rounded-xl shadow-md px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <img
          src={BP2TLImage}
          alt="BP2TL Logo"
          className="w-10 object-contain"
        />

        {/* Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-2 font-semibold text-[#1C0770] rounded-lg hover:bg-white/40 px-3 py-2 transition"
        >
          <span>{activeMenu || "Menu"}</span>

          <svg
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="currentColor" strokeWidth="2" d="m19 9-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 z-20 w-44 bg-white border rounded-md shadow-lg overflow-hidden">
            {DataMenus.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                onClick={() => {
                  setActiveMenu(menu.name);
                  setOpen(false);
                }}
                className={`block px-3 py-2 text-sm transition ${
                  activeMenu === menu.name
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {menu.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderScrolls;
