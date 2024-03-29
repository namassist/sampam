const users = [
  {
    username: "uadmin",
    password: "$2b$10$JFpKahP4HnqZ/zrt/3C3uuph3sslWvTZzCqkrk/xpAD9TbXTgg.T6", //secretadmin
    role: "admin",
  },
];

const divisions = [
  {
    name: "it",
  },
  {
    name: "admin",
  },
  {
    name: "finance",
  },
];

const menus = [
  {
    name: "notifikasi",
    role: "user",
    slug: "notifikasi",
    icon: "BiSolidBell",
    url: "/notifications",
    is_active: 1,
    order: 0,
    order: 3,
  },
  {
    name: "profil",
    role: "user",
    slug: "profil",
    icon: "BiSolidUser",
    url: "/profile",
    is_active: 1,
    order: 4,
  },
  {
    name: "dashboard",
    role: "user",
    slug: "dashboard",
    icon: "BiSolidDashboard",
    url: "/dashboard",
    is_active: 1,
    order: 0,
  },
  {
    name: "laporan",
    role: "user",
    slug: "logbook",
    icon: "BiSolidBook",
    url: "/logbooks",
    is_active: 1,
    order: 1,
  },
  {
    name: "presensi",
    role: "user",
    slug: "presensi",
    icon: "BiSolidBookContent",
    url: "/presences",
    is_active: 1,
    order: 2,
  },
  {
    name: "dashboard",
    role: "admin",
    slug: "dashboard-admin",
    icon: "BiSolidDashboard",
    url: "/admin/dashboard",
    is_active: 1,
    order: 0,
  },
  {
    name: "laporan",
    role: "admin",
    slug: "logbooks-admin",
    icon: "BiSolidBook",
    url: "/admin/logbooks",
    is_active: 1,
    order: 1,
  },
  {
    name: "menu",
    role: "admin",
    slug: "menus-admin",
    icon: "BiSolidCustomize",
    url: "/admin/menus",
    is_active: 1,
    order: 5,
  },
  {
    name: "notifikasi",
    role: "admin",
    slug: "notifications-admin",
    icon: "BiSolidBell",
    url: "/admin/notifications",
    is_active: 1,
    order: 3,
  },
  {
    name: "presensi",
    role: "admin",
    slug: "presences-admin",
    icon: "BiSolidBookContent",
    url: "/admin/presences",
    is_active: 1,
    order: 2,
  },
  {
    name: "pemagang",
    role: "admin",
    slug: "presences-users",
    icon: "BiSolidBookContent",
    url: "/admin/users",
    is_active: 1,
    order: 4,
  },
];

module.exports = { users, menus, divisions };
