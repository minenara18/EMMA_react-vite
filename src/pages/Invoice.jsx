import { useContext, useState } from "react";
import { Plus, Edit2, Trash2, Download } from "lucide-react";
import { DataContext } from "../context/DataContext";
import FormModal from "./FormModal";

export default function Invoice() {
  const { invoiceData, addInvoice, updateInvoice, deleteInvoice } =
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
      success = updateInvoice(editingId, data);
    } else {
      success = addInvoice(data);
    }
    if (success) {
      setShowModal(false);
      alert(
        editingId
          ? "Invoice berhasil diupdate!"
          : "Invoice berhasil ditambahkan!",
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus invoice ini?")) {
      deleteInvoice(id);
      alert("Invoice berhasil dihapus!");
    }
  };

  const stats = {
    total: invoiceData.length,
    belumLunas: invoiceData.filter((inv) => !inv.status?.includes("Rp")).length,
    lunas: invoiceData.filter((inv) => inv.status?.includes("Rp")).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Invoice</h1>
          <p className="text-gray-400 text-sm mt-1">{stats.total} invoice</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm font-medium">
            Export
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            <Plus size={20} />
            Buat Invoice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Belum Lunas</p>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {stats.belumLunas}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Lunas</p>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {stats.lunas}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Invoice</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">{stats.total}</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Cari..."
            className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition"
          />
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
          Semua
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Belum lunas
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Lunas
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Jatuh tempo
        </button>
      </div>

      {/* Invoice Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  No. Invoice
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Perusahaan
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Layanan
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Tgl Terbit
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Jatuh Tempo
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Nominal
                </th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.length > 0 ? (
                invoiceData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="py-4 px-6 font-mono text-red-500 font-medium">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {item.perusahaan}
                    </td>
                    <td className="py-4 px-6 text-gray-300">{item.layanan}</td>
                    <td className="py-4 px-6 text-gray-300">{item.tanggal}</td>
                    <td className="py-4 px-6 text-gray-300">{item.tempo}</td>
                    <td className="py-4 px-6 text-gray-300 font-medium">
                      {item.status}
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
                          className="p-2 text-green-400 hover:bg-green-900/30 rounded transition"
                          title="Download"
                        >
                          <Download size={18} />
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
                    Tidak ada data invoice. Klik tombol "Buat Invoice" untuk
                    menambah invoice baru.
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
          title={editingId ? "Edit Invoice" : "Buat Invoice"}
          initialData={editingData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          type="invoice"
        />
      )}
    </div>
  );
}
