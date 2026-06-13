import { useContext, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { DataContext } from "../context/DataContext";
import FormModal from "./FormModal";

export default function JadwalLayanan() {
  const { jadwalData, addJadwal, updateJadwal, deleteJadwal } =
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
      success = updateJadwal(editingId, data);
    } else {
      success = addJadwal(data);
    }
    if (success) {
      setShowModal(false);
      alert(
        editingId
          ? "Jadwal berhasil diupdate!"
          : "Jadwal berhasil ditambahkan!",
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus jadwal ini?")) {
      deleteJadwal(id);
      alert("Jadwal berhasil dihapus!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Jadwal Layanan</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manajemen jadwal layanan - Total: {jadwalData.length} jadwal
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          <Plus size={20} />
          Tambah
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Jadwal</p>
          <p className="text-3xl font-bold text-white mt-2">
            {jadwalData.length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Sedang Berlangsung</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {jadwalData.filter((j) => j.status === "On Going").length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Selesai</p>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {jadwalData.filter((j) => j.status === "Completed").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Perusahaan
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Layanan
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Tanggal
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Durasi
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Biaya
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
              {jadwalData.length > 0 ? (
                jadwalData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="py-4 px-6 text-gray-300 font-medium">
                      {item.perusahaan}
                    </td>
                    <td className="py-4 px-6 text-gray-300">{item.layanan}</td>
                    <td className="py-4 px-6 text-gray-300">{item.tanggal}</td>
                    <td className="py-4 px-6 text-gray-300">{item.durasi}</td>
                    <td className="py-4 px-6 text-gray-300">{item.biaya}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "On Going"
                            ? "bg-yellow-900/50 text-yellow-400"
                            : item.status === "Completed"
                              ? "bg-green-900/50 text-green-400"
                              : "bg-red-900/50 text-red-400"
                        }`}
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
                    Tidak ada data jadwal. Klik tombol "Tambah" untuk menambah
                    jadwal baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <FormModal
          title={editingId ? "Edit Jadwal Layanan" : "Tambah Jadwal Layanan"}
          initialData={editingData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          type="jadwal"
        />
      )}
    </div>
  );
}
