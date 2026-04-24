import LogoBp2TL from "../assets/icons/bp2tl.png";

function Footer() {
  return (
    <footer className="bg-[#192748]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0 mt-20">
            <a href="#" className="flex items-center">
              <img src={LogoBp2TL} className="h-14 me-3" alt="BP2TL Logo" />
              <span className="text-[#E2E8F0] text-heading self-center text-2xl font-semibold whitespace-nowrap">
                BP2TL Jakarta
              </span>
            </a>
            <div className="text-sm m-4 text-[#E2E8F0] flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
              <p className="text-base font-medium max-w-md">
                humas@bp2tl.ac.id
              </p>
            </div>
            <div className="text-sm m-4 text-[#E2E8F0] flex items-center gap-4">
              <svg
                className="w-6 h-6 text-[#E2E8F0]"
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
                  d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                />
              </svg>

              <p className="text-base font-medium max-w-md">
                +62 811-1402-0347
              </p>
            </div>
          </div>

          <div className="py-6 px-4 flex flex-col items-center">
            <div className="w-full max-w-md h-40 rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3676583714014!2d106.81359889999999!3d-6.346414299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee83c12bb671%3A0x3bb0b228c1abfe95!2s(%20BP2TL%20)%20Balai%20Pendidikan%20dan%20Pelatihan%20Transportasi%20Laut!5e0!3m2!1sid!2sid!4v1774845382702!5m2!1sid!2sid"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            {/* SEARCH BAR */}
            {/* <div className="mt-3 w-full max-w-md">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
                <span className="text-gray-400 mr-2">☰</span>
                <input
                  type="text"
                  placeholder="Hit road search here..."
                  className="flex-1 outline-none text-sm"
                />
                <span className="text-gray-400 ml-2">🔍</span>
              </div>
            </div> */}

            {/* ADDRESS */}
            <p className="text-[#E2E8F0] text-center text-sm mt-4 font-medium max-w-md">
              Jl. Moch. Kahfi II No.88, RT.02/05/RW.5, Cipedak, Kec. Jagakarsa,
              Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12630
            </p>
          </div>
        </div>

        <hr className="my-6 border-default sm:mx-auto lg:my-8" />

        {/* Bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="flex flex-wrap justify-center sm:justify-start gap-5 text-base text-body">
            <a
              className="hover:underline font-bold text-[#E4FF30]"
              href="https://diklat.bp2tl.ac.id/login.php"
            >
              LMS
            </a>
            <a
              className="hover:underline font-bold text-[#E4FF30]"
              href="https://diklat.bp2tl.ac.id/login.php"
            >
              Website BP2TL
            </a>
            <a
              className="hover:underline font-bold text-[#E4FF30]"
              href="https://diklat.bp2tl.ac.id/login.php"
            >
              Diklat
            </a>
          </span>

          {/* Social Icons */}
          <div className="flex justify-center mt-4  sm:mt-0 gap-4">
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
      </div>
    </footer>
  );
}

export default Footer;
