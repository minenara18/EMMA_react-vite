export default function SplashScreen({ onComplete }) {
  const handleStartClick = () => {
    // Panggil callback untuk hide splash screen
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen 
    bg-gradient-to-b from-[#0f1419] via-[#1a2332] to-[#0f1419] 
    overflow-hidden animate-fadeIn">
      <div className="text-center px-6">
        {/* Kapal SVG Logo */}
        <div className="mb-12 flex justify-center">
          <svg
            width="140"
            height="110"
            viewBox="0 0 140 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            {/* Kapal Hull */}
            <path
              d="M30 70 L35 50 L50 45 L90 45 L105 50 L110 70 Z"
              fill="none"
              stroke="#FF4444"
              strokeWidth="2"
            />

            {/* Kapal Main Body - Kotak Merah */}
            <rect x="45" y="55" width="50" height="25" fill="#FF4444" rx="2" />

            {/* Kapal Deck - Bagian Putih */}
            <rect x="42" y="48" width="56" height="8" fill="white" rx="1" />

            {/* Kapal Chimney - Corong */}
            <rect x="70" y="35" width="8" height="15" fill="#FF4444" />
            <ellipse cx="74" cy="34" rx="5" ry="3" fill="#FF4444" />

            {/* Kapal Mast - Tiang */}
            <line
              x1="74"
              y1="48"
              x2="74"
              y2="25"
              stroke="white"
              strokeWidth="2"
            />

            {/* Kapal Flag - Bendera */}
            <polygon points="78,25 78,32 88,28" fill="#FF4444" />

            {/* Kapal Window - Jendela */}
            <circle cx="55" cy="62" r="2" fill="white" />
            <circle cx="65" cy="62" r="2" fill="white" />
            <circle cx="75" cy="62" r="2" fill="white" />
            <circle cx="85" cy="62" r="2" fill="white" />

            {/* Kapal Anchor - Jangkar */}
            <line
              x1="40"
              y1="70"
              x2="40"
              y2="90"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M35 90 Q40 95 45 90"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />

            {/* Gelombang */}
            <path
              d="M20 85 Q30 88 40 85 T60 85 T80 85 T100 85 T120 85"
              fill="none"
              stroke="#4A9FD8"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M15 92 Q25 95 35 92 T55 92 T75 92 T95 92 T115 92"
              fill="none"
              stroke="#4A9FD8"
              strokeWidth="1.5"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Logo Text dengan Background */}
        <div className="mb-8 animate-slideDown">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
              EM
            </div>
            <span className="text-4xl font-bold text-white tracking-wider">
              EMMA
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-gray-300 text-sm mb-1 font-semibold animate-slideUp"
          style={{ animationDelay: "0.1s" }}
        >
          CV. EMMERA UTAMA
        </p>
        <p
          className="text-gray-400 text-xs mb-8 font-light animate-slideUp"
          style={{ animationDelay: "0.2s" }}
        >
          Solusi teknologi navigasi & layanan maritim
        </p>

        {/* CTA Button dengan Hover Effect */}
        <button
          onClick={handleStartClick}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto mb-16 shadow-lg hover:shadow-red-600/50 animate-slideUp"
          style={{ animationDelay: "0.3s" }}
        >
          <span>▶</span>
          Mulai Berlayar
        </button>

        {/* Footer */}
        <p
          className="text-gray-500 text-xs animate-slideUp"
          style={{ animationDelay: "0.4s" }}
        >
          EMMA.EMMERUTAMA.CO.ID | V2.0.0
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
