import { Calendar, TrendingUp, Package, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
} from "date-fns";
import { id } from "date-fns/locale";

export default function Dashboard() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getFirstDayOfMonth = () => {
    return getDay(startOfMonth(currentDate));
  };

  const days = getDaysInMonth();
  const firstDay = getFirstDayOfMonth();
  const emptyDays = Array(firstDay).fill(null);

  // Format tanggal untuk header
  const monthYear = format(currentDate, "MMMM yyyy", { locale: id });
  const todayFormatted = format(today, "d MMMM yyyy", { locale: id });

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">{todayFormatted}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm font-medium">
            Filter
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
            Tambah jadwal
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-red-600 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Layanan</p>
              <p className="text-4xl font-bold text-white mt-2">22</p>
            </div>
            <Calendar className="text-red-600" size={24} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-600 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sedang berlangsung</p>
              <p className="text-4xl font-bold text-yellow-500 mt-2">5</p>
            </div>
            <TrendingUp className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-600 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Selesai Bulan ini</p>
              <p className="text-4xl font-bold text-green-500 mt-2">11</p>
            </div>
            <Package className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-orange-600 transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-4xl font-bold text-orange-500 mt-2">8</p>
            </div>
            <AlertCircle className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Calendar & Recent Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white capitalize">
              {monthYear}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-700 rounded transition text-gray-400 hover:text-white"
              >
                ‹
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-700 rounded transition text-gray-400 hover:text-white"
              >
                ›
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
              <div
                key={day}
                className="text-center text-gray-400 text-sm font-semibold py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {days.map((day, i) => (
              <div
                key={i}
                onClick={() => setCurrentDate(day)}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition cursor-pointer ${
                  isToday(day)
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/50 hover:bg-red-700"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {day.getDate()}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-xs mb-3 font-semibold uppercase">
              Keterangan :
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-md shadow-lg shadow-red-600/50"></div>
                <span className="text-gray-400 text-xs">Hari ini</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-700 rounded-md"></div>
                <span className="text-gray-400 text-xs">Hari biasa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="space-y-4">
            <div className="pb-4 border-b border-gray-700">
              <p className="text-sm font-medium text-white">
                CV. Nailavi Mandiri
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Review pembayaran invoice
              </p>
              <p className="text-xs text-gray-500 mt-2">Hari ini</p>
            </div>
            <div className="pb-4 border-b border-gray-700">
              <p className="text-sm font-medium text-white">
                PT. Samudra Lines
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Persetujuan jadwal layanan
              </p>
              <p className="text-xs text-gray-500 mt-2">Kemarin</p>
            </div>
            <div className="pb-4 border-b border-gray-700">
              <p className="text-sm font-medium text-white">
                PT. Armada Samudra
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Pengecakan mesin navigasi
              </p>
              <p className="text-xs text-gray-500 mt-2">2 hari yang lalu</p>
            </div>
            <div className="pb-4">
              <p className="text-sm font-medium text-white">
                PT. Nusantara Shipping
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Pengajuan tagihan layanan
              </p>
              <p className="text-xs text-gray-500 mt-2">3 hari yang lalu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Services Table */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">
          Layanan Terbaru
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Perusahaan
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Layanan
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Tanggal
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Durasi
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  perusahaan: "PT. Nusantara Shipping",
                  layanan: "Service automatisasi navigasi",
                  tanggal: todayFormatted,
                  durasi: "10 hari",
                  status: "On Going",
                },
                {
                  perusahaan: "PT. Maju Maritim",
                  layanan: "Nahari mandiri kapal",
                  tanggal: todayFormatted,
                  durasi: "2 hari",
                  status: "On Going",
                },
                {
                  perusahaan: "PT. Samudra Lines",
                  layanan: "Instalasi kelistrikan",
                  tanggal: todayFormatted,
                  durasi: "5 hari",
                  status: "Completed",
                },
              ].map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="py-3 px-4 text-gray-300">{item.perusahaan}</td>
                  <td className="py-3 px-4 text-gray-300">{item.layanan}</td>
                  <td className="py-3 px-4 text-gray-300">{item.tanggal}</td>
                  <td className="py-3 px-4 text-gray-300">{item.durasi}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "On Going"
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-green-900/50 text-green-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
