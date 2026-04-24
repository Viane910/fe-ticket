const user = JSON.parse(localStorage.getItem("user") || "{}");

export const DataMenuDashboardMaster = [
  {
    label: "Dasboard",
    path: "/dashboardAdmin",
  },
  {
    label: "Kelola Petunjuk Penggunaan",
    path: "/petunjuk-penggunaan-admin-dashboard",
  },
  {
    label: "Kelola Pertanyaan",
    path: "/kelola-pertanyaan",
  },
  {
    label: "Kelola Users",
    path: "/kelola-user",
  },
];

export const DataMenuDashboardAdminBispro = [
  {
    label: "Dasboard",
    path: "/dashboardAdmin",
  },
  {
    label: "Menu Ticketing",
    children: [
      {
        label: "Pertanyaan Baru",
        path: "/ticketing-pertanyaan-bispro",
      },
      {
        label: "Pertanyaan Sukses Terjawab",
        path: "/ticketing/terjawab",
      },
    ],
  },
];

export const DataMenuDashboard =
  user?.role === "MASTER"
    ? DataMenuDashboardMaster
    : DataMenuDashboardAdminBispro;
