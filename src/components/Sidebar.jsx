import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Mail,
  Archive,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/jadwal-layanan", icon: Calendar, label: "Jadwal layanan" },
    { path: "/invoice", icon: FileText, label: "Invoice" },
  ];

  const docMenuItems = [
    { path: "/surat-keluar", icon: Mail, label: "Surat keluar" },
    { path: "/arsip-dokumen", icon: Archive, label: "Arsip dokumen" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Pengaturan" },
    { icon: LogOut, label: "Keluar" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="bg-red-600 text-white px-4 py-2 rounded font-bold text-lg">
          EMMA
        </div>
        <p className="text-gray-400 text-xs mt-2">CV Emmera Utama</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-2 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* DOKUMEN Section */}
        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-gray-500 text-xs font-semibold uppercase mb-3 px-2">
            Dokumen
          </h3>
          <nav className="space-y-2">
            {docMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-800 p-4 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition text-sm"
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
