import { useState } from "react";
import { X } from "lucide-react";

export default function FormModal({
  title,
  initialData,
  onSubmit,
  onClose,
  type,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState(
    initialData ||
      (type === "jadwal"
        ? {
            perusahaan: "",
            layanan: "",
            tanggal: today,
            durasi: "",
            biaya: "",
            status: "Pending",
          }
        : {
            perusahaan: "",
            layanan: "",
            tanggal: today,
            tempo: "",
            status: "",
          }),
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.perusahaan.trim())
      newErrors.perusahaan = "Perusahaan harus diisi";
    if (!formData.layanan.trim()) newErrors.layanan = "Layanan harus diisi";
    if (!formData.tanggal) newErrors.tanggal = "Tanggal harus diisi";

    if (type === "jadwal") {
      if (!formData.durasi.trim()) newErrors.durasi = "Durasi harus diisi";
      if (!formData.biaya.trim()) newErrors.biaya = "Biaya harus diisi";
    } else {
      if (!formData.tempo.trim()) newErrors.tempo = "Jatuh tempo harus diisi";
      if (!formData.status.trim()) newErrors.status = "Nominal/Status harus diisi";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error saat user mulai ketik
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full max-h-96 overflow-y-auto">
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
          {type === "jadwal" ? (
            <>
              {/* Perusahaan */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Perusahaan *
                </label>
                <input
                  type="text"
                  name="perusahaan"
                  value={formData.perusahaan}
                  onChange={handleChange}
                  placeholder="PT. Nusantara Shipping"
                  className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                    errors.perusahaan ? "border-red-500" : "border-gray-600"
                  } focus:border-red-600 focus:outline-none transition`}
                />
                {errors.perusahaan && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.perusahaan}
                  </p>
                )}
              </div>

              {/* Layanan */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Layanan *
                </label>
                <input
                  type="text"
                  name="layanan"
                  value={formData.layanan}
                  onChange={handleChange}
                  placeholder="Service automatisasi navigasi"
                  className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                    errors.layanan ? "border-red-500" : "border-gray-600"
                  } focus:border-red-600 focus:outline-none transition`}
                />
                {errors.layanan && (
                  <p className="text-red-400 text-xs mt-1">{errors.layanan}</p>
                )}
              </div>

              {/* Tanggal & Durasi */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tanggal *
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
                    <p className="text-red-400 text-xs mt-1">
                      {errors.tanggal}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durasi *
                  </label>
                  <input
                    type="text"
                    name="durasi"
                    value={formData.durasi}
                    onChange={handleChange}
                    placeholder="10 hari"
                    className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                      errors.durasi ? "border-red-500" : "border-gray-600"
                    } focus:border-red-600 focus:outline-none transition`}
                  />
                  {errors.durasi && (
                    <p className="text-red-400 text-xs mt-1">{errors.durasi}</p>
                  )}
                </div>
              </div>

              {/* Biaya & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Biaya *
                  </label>
                  <input
                    type="text"
                    name="biaya"
                    value={formData.biaya}
                    onChange={handleChange}
                    placeholder="Rp 12.500,0"
                    className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                      errors.biaya ? "border-red-500" : "border-gray-600"
                    } focus:border-red-600 focus:outline-none transition`}
                  />
                  {errors.biaya && (
                    <p className="text-red-400 text-xs mt-1">{errors.biaya}</p>
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
                    <option>Pending</option>
                    <option>On Going</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Perusahaan */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Perusahaan *
                </label>
                <input
                  type="text"
                  name="perusahaan"
                  value={formData.perusahaan}
                  onChange={handleChange}
                  placeholder="PT. Nusantara Shipping"
                  className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                    errors.perusahaan ? "border-red-500" : "border-gray-600"
                  } focus:border-red-600 focus:outline-none transition`}
                />
                {errors.perusahaan && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.perusahaan}
                  </p>
                )}
              </div>

              {/* Layanan */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Layanan *
                </label>
                <input
                  type="text"
                  name="layanan"
                  value={formData.layanan}
                  onChange={handleChange}
                  placeholder="Service automatisasi navigasi"
                  className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                    errors.layanan ? "border-red-500" : "border-gray-600"
                  } focus:border-red-600 focus:outline-none transition`}
                />
                {errors.layanan && (
                  <p className="text-red-400 text-xs mt-1">{errors.layanan}</p>
                )}
              </div>

              {/* Tanggal & Tempo */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tgl Terbit *
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
                    <p className="text-red-400 text-xs mt-1">
                      {errors.tanggal}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Jatuh Tempo *
                  </label>
                  <input
                    type="date"
                    name="tempo"
                    value={formData.tempo}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                      errors.tempo ? "border-red-500" : "border-gray-600"
                    } focus:border-red-600 focus:outline-none transition`}
                  />
                  {errors.tempo && (
                    <p className="text-red-400 text-xs mt-1">{errors.tempo}</p>
                  )}
                </div>
              </div>

              {/* Nominal/Status Pembayaran */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nominal/Status Pembayaran *
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="Rp 12.500.0 atau kosong jika belum lunas"
                  className={`w-full bg-gray-700 text-gray-100 px-3 py-2 rounded border ${
                    errors.status ? "border-red-500" : "border-gray-600"
                  } focus:border-red-600 focus:outline-none transition`}
                />
                {errors.status && (
                  <p className="text-red-400 text-xs mt-1">{errors.status}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Isi dengan nominal (Rp) jika sudah lunas, kosongkan jika belum
                </p>
              </div>
            </>
          )}

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
