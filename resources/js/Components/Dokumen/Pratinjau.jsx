import React, { useState } from "react";
import { BookA, Download, Languages } from "lucide-react";
import { pdfjs } from "react-pdf";

// Gunakan worker dari CDN sesuai versi pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = 
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer({ file, title }) {
  // const [translatedText, setTranslatedText] = useState("");
  // const [loading, setLoading] = useState(false);

  // === Fungsi Terjemahan (dinonaktifkan sementara) ===
  // const handleTranslate = async () => {
  //   try {
  //     setLoading(true);

  //     // // Ekstrak teks PDF
  //     // const pdf = await pdfjs.getDocument(file).promise;
  //     // let extractedText = "";
  //     // for (let i = 1; i <= pdf.numPages; i++) {
  //     //   const page = await pdf.getPage(i);
  //     //   const content = await page.getTextContent();
  //     //   const text = content.items.map((item) => item.str).join(" ");
  //     //   extractedText += text + "\n";
  //     // }

  //     // // Kirim ke backend Laravel untuk translate
  //     // const response = await fetch("/api/translate", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({
  //     //     text: extractedText,
  //     //     targetLang: "en", // ubah sesuai kebutuhan
  //     //   }),
  //     // });

  //     // const data = await response.json();
  //     // setTranslatedText(data.translation || "⚠️ Terjemahan gagal.");
  //   } catch (err) {
  //     console.error("Gagal translate:", err);
  //     // setTranslatedText("⚠️ Tidak bisa membaca atau menerjemahkan PDF.");
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-7xl mx-auto my-10 px-6" data-aos="fade-up">
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookA /> Pratinjau Dokumen
          </h3>
          <div className="flex items-center gap-2">
            {/* Tombol Translate (dinonaktifkan sementara) */}
            {/* 
            <button
              onClick={handleTranslate}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md text-sm"
              disabled={loading}
            >
              <Languages size={16} />
              {loading ? "Menerjemahkan..." : "Translate"}
            </button>
            */}
            <a
              href={file}
              download={title}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md text-sm"
            >
              <Download size={16} /> Unduh
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-gray-100 flex items-center justify-center">
          <iframe src={file} title="PDF Viewer" className="w-full h-[800px]" />
        </div>
      </div>

      {/* Area hasil terjemahan (nonaktif) */}
      {/* 
      {translatedText && (
        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg shadow">
          <h4 className="font-semibold text-blue-700 mb-2">Hasil Terjemahan</h4>
          <p className="text-gray-800 whitespace-pre-line">{translatedText}</p>
        </div>
      )} 
      */}
    </div>
  );
}
