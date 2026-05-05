import { useState } from "react";
import DataMenus from "../data/data-menus";
import BP2TLImage from "../assets/icons/bp2tl.png";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className=" bg-[#E4FF30] fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 py-3 shadow md:top-6 md:rounded-3xl lg:max-w-screen-lg ">
        <div className="px-4 flex items-center justify-between">
          {/* LOGO */}
          <img className="h-12 w-auto" src={BP2TLImage} alt="BP2TL Logo" />
         <h1 className="text-gray-800 text-xl lg:hidden font-bold">BP2TL Jakarta </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-5">
            {DataMenus.map((menu) => (
              <li key={menu.path}>
                <Link
                  to={menu.path}
                  className="px-2 py-1 font-semibold text-[#0F1D2E] hover:bg-gray-100 rounded-lg transition"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* BUTTON DESKTOP */}
          <div className="hidden md:flex">
            <Link
              to="/login"
              className="rounded-xl bg-[#FFB428] px-4 py-2 font-semibold hover:opacity-90 transition"
            >
              Admin Dashboard
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <svg
              className="w-8 h-8 text-gray-800"
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
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-[#E4FF30] z-50 
  transform transition-transform duration-300 ease-in-out 
  flex flex-col md:hidden
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-end p-4 border-b">
          {/* <img className="h-10" src={BP2TLImage} alt="Logo" /> */}
          <button onClick={() => setIsOpen(false)} className="text-2xl">
            <svg
              className="w-8 h-8 text-gray-800"
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

        {/* MENU */}
        <div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto">
          {DataMenus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#f1f1f1] px-4 py-3 font-xl font-semibold"
            >
              {menu.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t mb-12">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#FFB428] py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
