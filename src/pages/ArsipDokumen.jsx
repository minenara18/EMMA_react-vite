import { useContext, useState, useRef } from "react";
import { Trash2, Download, Upload, FileText, File } from "lucide-react";
import { DataContext } from "../context/DataContext";

export default function ArsipDokumen() {
  const { arsipData, addArsip, deleteArsip } = useContext(DataContext);
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus dokumen ini?")) {
      deleteArsip(id);
      alert("Dokumen berhasil dihapus!");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let successCount = 0;
      const categories = [
        "Berita Acara",
        "Keuangan",
        "Surat Tanda",
        "Arsipik",
        "Delivery",
      ];

      Array.from(files).forEach((file) => {
        // Validasi ukuran file (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} terlalu besar (max 10MB)`);
          return;
        }

        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
        const success = addArsip({
          nama: file.name,
          kategori: randomCategory,
          terkait: "PT. Nusantara Shipping",
          ukuran: `${(file.size / 1024).toFixed(0)} KB`,
          keterangan: `Uploaded: ${file.name}`,
        });
        if (success) successCount++;
      });

      if (successCount > 0) {
        setUploadStatus(`${successCount} file berhasil diupload!`);
        setTimeout(() => setUploadStatus(""), 3000);
        alert(`${successCount} dokumen berhasil diupload!`);
      }
    }
    e.target.value = "";
  };

  const categoryColors = {
    "Berita Acara": "bg-blue-900/50 text-blue-400",
    Keuangan: "bg-green-900/50 text-green-400",
    "Surat Tanda": "bg-yellow-900/50 text-yellow-400",
    Arsipik: "bg-orange-900/50 text-orange-400",
    Delivery: "bg-red-900/50 text-red-400",
  };

  const getFileIcon = (nama) => {
    if (nama.endsWith(".pdf"))
      return <FileText className="text-red-500" size={24} />;
    if (nama.endsWith(".xlsx") || nama.endsWith(".xls"))
      return <File className="text-green-500" size={24} />;
    if (nama.endsWith(".doc") || nama.endsWith(".docx"))
      return <FileText className="text-blue-500" size={24} />;
    return <File className="text-gray-400" size={24} />;
  };

  const stats = {
    total: arsipData.length,
    beritaAcara: arsipData.filter((a) => a.kategori === "Berita Acara").length,
    keuangan: arsipData.filter((a) => a.kategori === "Keuangan").length,
    suratTanda: arsipData.filter((a) => a.kategori === "Surat Tanda").length,
    arsipik: arsipData.filter((a) => a.kategori === "Arsipik").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Arsip Dokumen</h1>
          <p className="text-gray-400 text-sm mt-1">
            {stats.total} dokumen tersimpan
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition font-medium">
            <Download size={20} />
            Export
          </button>
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            <Upload size={20} />
            Upload dokumen
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
          />
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="bg-green-900/30 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
          ✓ {uploadStatus}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-white/20 transition">
          <p className="text-gray-400 text-sm">Total dokumen</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
          <p className="text-gray-500 text-xs mt-1">Semua kategori</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition">
          <p className="text-gray-400 text-sm">Berita Acara</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {stats.beritaAcara}
          </p>
          <p className="text-gray-500 text-xs mt-1">dokumen</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-500 transition">
          <p className="text-gray-400 text-sm">Surat Tanda</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {stats.suratTanda}
          </p>
          <p className="text-gray-500 text-xs mt-1">dokumen</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-red-500 transition">
          <p className="text-gray-400 text-sm">Surat Tegak</p>
          <p className="text-3xl font-bold text-red-400 mt-2">9</p>
          <p className="text-gray-500 text-xs mt-1">dokumen</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Cari dokumen..."
            className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition"
          />
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
          Semua
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Berita Acara
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Surat Tanda
        </button>
        <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
          Delivery Order
        </button>
      </div>

      {/* Arsip Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Nama Dokumen
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Kategori
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Terkait
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Tanggal Upload
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Ukuran
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                  Keterangan
                </th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {arsipData.length > 0 ? (
                arsipData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {getFileIcon(item.nama)}
                        <span className="text-gray-300 font-medium max-w-xs truncate">
                          {item.nama}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[item.kategori]}`}
                      >
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{item.terkait}</td>
                    <td className="py-4 px-6 text-gray-300">
                      {item.tanggalUpload}
                    </td>
                    <td className="py-4 px-6 text-gray-300 font-medium">
                      {item.ukuran}
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-xs">
                      {item.keterangan}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
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
                    Tidak ada dokumen. Klik tombol "Upload dokumen" untuk
                    menambah dokumen baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
