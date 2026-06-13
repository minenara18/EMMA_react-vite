import { createContext, useState, useCallback } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [jadwalData, setJadwalData] = useState([
    {
      id: 1,
      perusahaan: "PT. Nusantara Shipping",
      layanan: "Service automatisasi navigasi",
      tanggal: "1 Jun 2024",
      durasi: "10 hari",
      biaya: "Rp 12.500,0",
      status: "On Going",
    },
    {
      id: 2,
      perusahaan: "PT. Maju Maritim",
      layanan: "Nahari mandiri kapal",
      tanggal: "28 Mei 2024",
      durasi: "2 hari",
      biaya: "Rp 8.500,0",
      status: "On Going",
    },
    {
      id: 3,
      perusahaan: "PT. Samudra Lines",
      layanan: "Instalasi kelistrikan",
      tanggal: "25 Mei 2024",
      durasi: "5 hari",
      biaya: "Rp 18.000,0",
      status: "Completed",
    },
  ]);

  const [invoiceData, setInvoiceData] = useState([
    {
      id: "INV-2024-001",
      perusahaan: "PT. Nusantara Shipping",
      layanan: "Service automatisasi navigasi",
      tanggal: "1 Jun 2024",
      tempo: "10 hari",
      status: "Rp 12.500,0",
      keterangan: "",
    },
    {
      id: "INV-2024-040",
      perusahaan: "PT. Maju Maritim",
      layanan: "Nahari mandiri kapal",
      tanggal: "28 Mei 2024",
      tempo: "2 hari",
      status: "Rp 8.500,0",
      keterangan: "",
    },
  ]);

  const [suratData, setSuratData] = useState([
    {
      id: "ST-2024-001",
      jenis: "Permohonan Harga",
      tujuan: "PT. Nusantara Shipping",
      perihal: "8 surat",
      tanggal: "1 Jun 2024",
      status: "Ditujukan",
    },
    {
      id: "ST-2024-040",
      jenis: "Surat Tanda Terima",
      tujuan: "PT. Maju Maritim",
      perihal: "3 surat",
      tanggal: "28 Mei 2024",
      status: "Terkirim",
    },
    {
      id: "DO-2024-017",
      jenis: "Delivery Order",
      tujuan: "PT. Samudra Lines",
      perihal: "4 surat",
      tanggal: "25 Mei 2024",
      status: "Draft",
    },
    {
      id: "BA-2024-033",
      jenis: "Berita Acara",
      tujuan: "PT. Armada Samudra",
      perihal: "2 surat",
      tanggal: "20 Mei 2024",
      status: "Selesai",
    },
    {
      id: "PR-2024-037",
      jenis: "Purchase Request",
      tujuan: "PT. Maju Maritim",
      perihal: "28 surat",
      tanggal: "18 Mei 2024",
      status: "Mengirim",
    },
  ]);

  const [arsipData, setArsipData] = useState([
    {
      id: "DOC-2024-001",
      nama: "ST-2024-001-Jun-2024.pdf",
      kategori: "Berita Acara",
      terkait: "PT. Nusantara Shipping",
      tanggalUpload: "4 Jun 2024",
      ukuran: "245 KB",
      keterangan: "Surat kesepakatan",
    },
    {
      id: "DOC-2024-002",
      nama: "INV-2024-040-Mei-2024.xlsx",
      kategori: "Keuangan",
      terkait: "PT. Maju Maritim",
      tanggalUpload: "1 Jun 2024",
      ukuran: "89 KB",
      keterangan: "Invoice internal",
    },
    {
      id: "DOC-2024-003",
      nama: "ST-2024-017-Mei-2024.pdf",
      kategori: "Surat Tanda",
      terkait: "PT. Samudra Lines",
      tanggalUpload: "30 Mei 2024",
      ukuran: "120 KB",
      keterangan: "Terima barang",
    },
    {
      id: "DOC-2024-004",
      nama: "INV-2024-057-Mei-2024.pdf",
      kategori: "Arsipik",
      terkait: "PT. Maju Maritim",
      tanggalUpload: "28 Mei 2024",
      ukuran: "98 KB",
      keterangan: "",
    },
    {
      id: "DOC-2024-005",
      nama: "DO-2024-035-Mei-2024.pdf",
      kategori: "Delivery",
      terkait: "PT. Armada Samudra",
      tanggalUpload: "25 Mei 2024",
      ukuran: "95 KB",
      keterangan: "",
    },
  ]);

  // Jadwal functions
  const addJadwal = useCallback(
    (data) => {
      const newItem = {
        id: Math.max(...jadwalData.map((j) => j.id), 0) + 1,
        ...data,
      };
      setJadwalData((prev) => [newItem, ...prev]);
    },
    [jadwalData],
  );

  const updateJadwal = useCallback((id, data) => {
    setJadwalData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
  }, []);

  const deleteJadwal = useCallback((id) => {
    setJadwalData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Invoice functions
  const addInvoice = useCallback(
    (data) => {
      const newId = `INV-${new Date().getFullYear()}-${String(invoiceData.length + 1).padStart(3, "0")}`;
      const newItem = { id: newId, ...data };
      setInvoiceData((prev) => [newItem, ...prev]);
    },
    [invoiceData],
  );

  const updateInvoice = useCallback((id, data) => {
    setInvoiceData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
  }, []);

  const deleteInvoice = useCallback((id) => {
    setInvoiceData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Surat functions
  const addSurat = useCallback(
    (data) => {
      const prefix =
        data.jenis === "Permohonan Harga"
          ? "ST"
          : data.jenis === "Surat Tanda Terima"
            ? "ST"
            : data.jenis === "Delivery Order"
              ? "DO"
              : data.jenis === "Berita Acara"
                ? "BA"
                : "PR";
      const newId = `${prefix}-${new Date().getFullYear()}-${String(suratData.length + 1).padStart(3, "0")}`;
      const newItem = { id: newId, ...data };
      setSuratData((prev) => [newItem, ...prev]);
    },
    [suratData],
  );

  const updateSurat = useCallback((id, data) => {
    setSuratData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
  }, []);

  const deleteSurat = useCallback((id) => {
    setSuratData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Arsip functions
  const addArsip = useCallback(
    (data) => {
      const newId = `DOC-${new Date().getFullYear()}-${String(arsipData.length + 1).padStart(3, "0")}`;
      const newItem = {
        id: newId,
        ...data,
        tanggalUpload: new Date().toLocaleDateString("id-ID"),
      };
      setArsipData((prev) => [newItem, ...prev]);
    },
    [arsipData],
  );

  const deleteArsip = useCallback((id) => {
    setArsipData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <DataContext.Provider
      value={{
        jadwalData,
        invoiceData,
        suratData,
        arsipData,
        addJadwal,
        updateJadwal,
        deleteJadwal,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        addSurat,
        updateSurat,
        deleteSurat,
        addArsip,
        deleteArsip,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
