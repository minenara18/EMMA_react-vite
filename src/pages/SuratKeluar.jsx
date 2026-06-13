import { useContext, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { DataContext } from "../context/DataContext";
import SuratModal from "./SuratModal";

export default function SuratKeluar() {
  const { suratData, addSurat, updateSurat, deleteSurat } =
    useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const handleAdd = () => {
    setEditingId(null);
    setEditingData(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditingData(item);
    setShowModal(true);
  };

  const handleSubmit = (data) => {
    let success;
    if (editingId) {
      success = updateSurat(editingId, data);
    } else {
      success = addSurat(data);
    }
    if (success) {
      setShowModal(false);
      alert(
        editingId ? "Surat berhasil diupdate!" : "Surat berhasil ditambahkan!",
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus surat ini?")) {
      deleteSurat(id);
      alert("Surat berhasil dihapus!");
    }
  };

  const statusColors = {
    Ditujukan: "bg-green-900/50 text-green-400",
    Terkirim: "bg-blue-900/50 text-blue-400",
    Draft: "bg-yellow-900/50 text-yellow-400",
    Selesai: "bg-purple-900/50 text-purple-400",
    Mengirim: "bg-orange-900/50 text-orange-400",
  };

  const getJenisIcon = (jenis) => {
    const icons = {
      "Permohonan Harga": "📋",
      "Surat Tanda Terima": "✓",
      "Delivery Order": "📦",
      "Berita Acara": "📄",
      "Purchase Request": "🛒",
    };
    return icons[jenis] || "📄";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Surat Keluar</h1>
          <p className="text-gray-400 text-sm mt-1">
            Kelola semua dokumen surat keluar - Total: {suratData.length} surat
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          <Plus size={20} />
          Buat surat baru
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center hover:border-red-600 transition">
          <p className="text-gray-400 text-sm">Permohonan</p>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {suratData.filter((s) => s.jenis === "Permohonan Harga").length}
          </p>
          <p className="text-gray-500 text-xs mt-1">surat</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center hover:border-yellow-600 transition">
          <p className="text-gray-400 text-sm">Surat Tanda</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {suratData.filter((s) => s.jenis === "Surat Tanda Terima").length}
          </p>
          <p className="text-gray-500 text-xs mt-1">surat</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center hover:border-green-600 transition">
          <p className="text-gray-400 text-sm">Delivery Order</p>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {suratData.filter((s) => s.jenis === "Delivery Order").length}
          </p>
          <p className="text-gray-500 text-xs mt-1">surat</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center hover:border-blue-600 transition">
          <p className="text-gray-400 text-sm">Berita Acara</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            {suratData.filter((s) => s.jenis === "Berita Acara").length}
          </p>
          <p className="text-gray-500 text-xs mt-1">surat</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center hover:border-purple-600 transition">
          <p className="text-gray-400 text-sm">Dokumentasi</p>
          <p className="text-3xl font-bold text-purple-500 mt-2">
            {suratData.filter((s) => s.jenis === "Purchase Request").length}
          </p>
          <p className="text-gray-500 text-xs mt-1">surat</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Cari surat..."
            className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition"
          />
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
          Semua
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Draft
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Terkirim
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Selesai
        </button>
      </div>

      {/* Surat Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  No. Surat
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Jenis
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Tujuan
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Perihal
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Tanggal
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Status
                </th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {suratData.length > 0 ? (
                suratData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="py-4 px-6 font-mono text-red-500 font-medium">
                      {item.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span>{getJenisIcon(item.jenis)}</span>
                        <span className="text-gray-300">{item.jenis}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{item.tujuan}</td>
                    <td className="py-4 px-6 text-gray-300">{item.perihal}</td>
                    <td className="py-4 px-6 text-gray-300">{item.tanggal}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-400 hover:bg-blue-900/30 rounded transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-400 hover:bg-red-900/30 rounded transition"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 px-6 text-center text-gray-400"
                  >
                    Tidak ada data surat. Klik tombol "Buat surat baru" untuk
                    menambah surat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <SuratModal
          title={editingId ? "Edit Surat Keluar" : "Buat Surat Baru"}
          initialData={editingData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
