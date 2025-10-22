// resources/js/Components/FontProvider.jsx
import React, { useEffect } from "react";

export default function FontProvider({ children }) {
  // Masukkan link Google Fonts sekali saja di seluruh app
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Terapkan font global + warna teks default
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        color: "#1f2937", // text-gray-800 default
      }}
    >
      {children}
    </div>
  );
}
