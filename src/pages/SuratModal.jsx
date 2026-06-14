import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function SuratModal({ title, initialData, onSubmit, onClose }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState(
    initialData || {
      jenis: "Permohonan Harga",
      tujuan: "",
      perihal: "",
      tanggal: today,
      status: "Draft",
    },
  );

  const [errors, setErrors] = useState({});
  const [tujuanOptions, setTujuanOptions] = useState([
    "PT. Nusantara Shipping",
    "PT. Maju Maritim",
    "PT. Samudra Lines",
    "PT. Armada Samudra",
    "CV. Nailavi Mandiri",
  ]);
  const [showAddTujuan, setShowAddTujuan] = useState(false);
  const [newTujuan, setNewTujuan] = useState("");

  const jenisOptions = [
    "Permohonan Harga",
    "Surat Tanda Terima",
    "Delivery Order",
    "Berita Acara",
    "Purchase Request",
  ];

  const statusOptions = [
    "Draft",
    "Ditujukan",
    "Terkirim",
    "Selesai",
    "Mengirim",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jenis.trim()) newErrors.jenis = "Jenis surat harus dipilih";
    if (!formData.tujuan.trim()) newErrors.tujuan = "Tujuan harus dipilih";
    if (!formData.perihal.trim()) newErrors.perihal = "Perihal harus diisi";
    if (!formData.tanggal) newErrors.tanggal = "Tanggal harus diisi";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddTujuan = () => {
    if (newTujuan.trim() && !tujuanOptions.includes(newTujuan.trim())) {
      const addedTujuan = newTujuan.trim();
      setTujuanOptions([...tujuanOptions, addedTujuan]);
      setFormData((prev) => ({
        ...prev,
        tujuan: addedTujuan,
      }));
      setNewTujuan("");
      setShowAddTujuan(false);
      // Clear error jika ada
      if (errors.tujuan) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.tujuan;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format tanggal ke Indonesia
    const dateObj = new Date(formData.tanggal);
    const formattedDate = dateObj.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const submitData = { ...formData, tanggal: formattedDate };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Jenis Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Jenis Surat *
            </label>
            <select
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                errors.jenis ? "border-red-500" : "border-gray-600"
              } focus:border-red-600 focus:outline-none transition`}
            >
              {jenisOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.jenis && (
              <p className="text-red-400 text-xs mt-1">{errors.jenis}</p>
            )}
          </div>

          {/* Tujuan Surat */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tujuan Surat *
            </label>
            {!showAddTujuan ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    name="tujuan"
                    value={formData.tujuan}
                    onChange={handleChange}
                    className={`flex-1 bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                      errors.tujuan ? "border-red-500" : "border-gray-600"
                    } focus:border-red-600 focus:outline-none transition`}
                  >
                    <option value="">-- Pilih Tujuan --</option>
                    {tujuanOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddTujuan(true)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    title="Tambah PT./CV. baru"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {errors.tujuan && (
                  <p className="text-red-400 text-xs">{errors.tujuan}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newTujuan}
                  onChange={(e) => setNewTujuan(e.target.value)}
                  placeholder="Contoh: PT. Baru Jaya"
                  className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border border-gray-600 focus:border-red-600 focus:outline-none transition"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddTujuan}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddTujuan(false);
                      setNewTujuan("");
                    }}
                    className="flex-1 px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition text-sm font-medium"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Perihal */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Perihal *
            </label>
            <input
              type="text"
              name="perihal"
              value={formData.perihal}
              onChange={handleChange}
              placeholder="Contoh: 5 surat"
              className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                errors.perihal ? "border-red-500" : "border-gray-600"
              } focus:border-red-600 focus:outline-none transition`}
            />
            {errors.perihal && (
              <p className="text-red-400 text-xs mt-1">{errors.perihal}</p>
            )}
          </div>

          {/* Tanggal & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tanggal Surat *
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                  errors.tanggal ? "border-red-500" : "border-gray-600"
                } focus:border-red-600 focus:outline-none transition`}
              />
              {errors.tanggal && (
                <p className="text-red-400 text-xs mt-1">{errors.tanggal}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border border-gray-600 focus:border-red-600 focus:outline-none transition"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
