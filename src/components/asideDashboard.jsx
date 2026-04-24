import { useState } from "react";
import LogoBP2TL from "../assets/icons/bp2tl.png";

export default function AsideDashboard({
  isSidebarOpen,
  setIsSidebarOpen,
  menu,
  handleLogOut,
}) {
  const [openDropdown, setOpenDropdown] = useState({});

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px]
bg-gradient-to-b from-[#261CC1] to-[#3B0270]
transition-transform duration-300
pointer-events-auto

  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-20 flex items-center px-6 border-b gap-4">
          <div className="flex items-center gap-6">
            <img className="h-14 w-14" src={LogoBP2TL} alt="Logo BP2TL" />
            <h1 className="text-[#f1f1f1] font-bold">BP2TL Dashboard</h1>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className=" text-xl lg:hidden"
          >
            <svg
              className="w-8 h-8 text-[#f1f1f1]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <nav className="p-4 space-y-2">
            {menu.map((item, index) => (
              <div key={index}>
                {/* 🔹 MENU BIASA */}
                {!item.children ? (
                  <a
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-3 font-medium rounded-lg text-white hover:bg-white/20 transition"
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    {/* 🔹 HEADER DROPDOWN */}
                    <button
                      onClick={() =>
                        setOpenDropdown((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                      className="w-full flex justify-between items-center px-4 py-3 font-medium text-white rounded-lg hover:bg-white/20 transition"
                    >
                      {item.label}
                      <span className="text-xs">
                        {openDropdown[index] ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* 🔹 ISI DROPDOWN */}
                    {openDropdown[index] && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child, i) => (
                          <a
                            key={i}
                            href={child.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-200 rounded-lg hover:bg-white/20"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </nav>

        <div className="p-4 text-center absolute bottom-0 w-full">
          <button
            onClick={handleLogOut}
            className="bg-[#FF6B6B] text-white py-2 px-4 rounded-lg hover:bg-[#FF5252]"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
