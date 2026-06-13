import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import JadwalLayanan from "./pages/JadwalLayanan";
import Invoice from "./pages/Invoice";
import SuratKeluar from "./pages/SuratKeluar";
import ArsipDokumen from "./pages/ArsipDokumen";
import { DataProvider } from "./context/DataContext";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <DataProvider>
      <Router>
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="jadwal-layanan" element={<JadwalLayanan />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="surat-keluar" element={<SuratKeluar />} />
              <Route path="arsip-dokumen" element={<ArsipDokumen />} />
            </Route>
          </Routes>
        )}
      </Router>
    </DataProvider>
  );
}

export default App;
