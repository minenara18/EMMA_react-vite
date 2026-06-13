import { Search, Settings, Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Cari..."
              className="w-full bg-gray-800 text-gray-100 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="text-gray-400 hover:text-white transition">
            <Bell size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <Settings size={20} />
          </button>
          <button className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition">
            <User size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
