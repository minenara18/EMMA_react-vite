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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");

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

  // Fungsi untuk menentukan status invoice
  const getInvoiceStatus = (item) => {
    // Cek apakah invoice sudah lunas (jika nominal terisi)
    if (item.nominal && item.nominal.trim()) {
      return "lunas";
    }
    // Cek apakah invoice jatuh tempo (berdasarkan tanggal tempo)
    if (item.tempo) {
      const tempoDate = new Date(item.tempo);
      const today = new Date();
      if (tempoDate < today) {
        return "jatuhTempo";
      }
    }
    return "belumLunas";
  };

  // Filter data berdasarkan search dan status
  const filteredData = invoiceData.filter((item) => {
    const matchesSearch =
      item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.perusahaan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.layanan?.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "semua") {
      return matchesSearch;
    }

    const itemStatus = getInvoiceStatus(item);
    return matchesSearch && itemStatus === filterStatus;
  });

  const stats = {
    total: invoiceData.length,
    belumLunas: invoiceData.filter(
      (inv) => getInvoiceStatus(inv) === "belumLunas",
    ).length,
    lunas: invoiceData.filter((inv) => getInvoiceStatus(inv) === "lunas")
      .length,
    jatuhTempo: invoiceData.filter(
      (inv) => getInvoiceStatus(inv) === "jatuhTempo",
    ).length,
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
          <p className="text-gray-400 text-sm">Jatuh Tempo</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.jatuhTempo}</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Cari invoice, perusahaan, atau layanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition"
          />
        </div>
        <button
          onClick={() => setFilterStatus("semua")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "semua"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilterStatus("belumLunas")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "belumLunas"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Belum lunas
        </button>
        <button
          onClick={() => setFilterStatus("lunas")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "lunas"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Lunas
        </button>
        <button
          onClick={() => setFilterStatus("jatuhTempo")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "jatuhTempo"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
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
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
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
                      {item.nominal || "-"}
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
                    {searchQuery || filterStatus !== "semua"
                      ? "Tidak ada data invoice yang sesuai dengan pencarian atau filter."
                      : "Tidak ada data invoice. Klik tombol 'Buat Invoice' untuk menambah invoice baru."}
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
