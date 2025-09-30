// File: resources/js/Components/Pagination.jsx
import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  const windowSize = 5; // jumlah halaman di tengah
  let pages = [];

  // Kasus awal (halaman kecil)
  if (currentPage <= windowSize) {
    for (let i = 1; i <= Math.min(windowSize, totalPages); i++) {
      pages.push(i);
    }
    if (totalPages > windowSize + 1) {
      pages.push("ellipsis");
      pages.push(totalPages);
    }
  }
  // Kasus akhir (mendekati halaman terakhir)
  else if (currentPage > totalPages - windowSize) {
    pages.push(1);
    if (totalPages > windowSize + 1) {
      pages.push("ellipsis");
    }
    for (let i = totalPages - windowSize + 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }
  // Kasus tengah
  else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push("ellipsis");
    }
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md border p-4 mt-6"
      data-aos="fade-left"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {/* Prev - selalu kiri */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border 
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed border-gray-300"
                  : "hover:bg-orange-50 hover:text-orange-600 border-gray-300"
              }`}
          >
            ‹
          </button>

          {/* Numbers */}
          {pages.map((page, idx) =>
            page === "ellipsis" ? (
              <span
                key={`e-${idx}`}
                className="px-2 text-gray-500 select-none"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg border transition 
                  ${
                    currentPage === page
                      ? "bg-orange-500 text-white border-orange-500 shadow-md scale-105"
                      : "hover:bg-orange-50 hover:text-orange-600 border-gray-300"
                  }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next - selalu kanan */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border 
              ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed border-gray-300"
                  : "hover:bg-orange-50 hover:text-orange-600 border-gray-300"
              }`}
          >
            ›
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-600">
          Menampilkan halaman{" "}
          <span className="font-semibold text-orange-600">{currentPage}</span>{" "}
          dari <span className="font-semibold">{totalPages}</span> halaman
        </p>
      </div>
    </div>
  );
}
