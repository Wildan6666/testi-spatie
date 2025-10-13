import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";

/**
 * Komponen TreeList — menampilkan pohon produk hukum bertingkat
 * @param {Array} nodes - data tree (id, judul, nomor, tahun, children)
 * @param {number} level - tingkat indentasi (default 0)
 */
export default function TreeList({ nodes, level = 0 }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <ul
      className={`pl-${level > 0 ? 4 : 0} border-l ${
        level > 0 ? "border-orange-200" : ""
      }`}
    >
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} level={level} />
      ))}
    </ul>
  );
}

/**
 * Komponen Node tunggal
 */
function TreeNode({ node, level }) {
  const [expanded, setExpanded] = useState(level < 1); // default: expand level 0
  const hasChildren = node.children && node.children.length > 0;

  return (
  <li className="my-2 relative">
    {/* Baris utama dokumen */}
    <div
      className={`flex items-start gap-2 cursor-pointer rounded-lg px-3 py-2 border transition-all duration-150
        ${hasChildren ? "hover:bg-orange-50 border-orange-100" : "border-transparent hover:bg-gray-50"}
      `}
      onClick={() => hasChildren && setExpanded(!expanded)}
    >
      {/* Icon kiri (chevron / file) */}
      {hasChildren ? (
        expanded ? (
          <ChevronDown size={16} className="text-orange-500 flex-shrink-0 mt-[2px]" />
        ) : (
          <ChevronRight size={16} className="text-orange-500 flex-shrink-0 mt-[2px]" />
        )
      ) : (
        <FileText size={15} className="text-gray-400 flex-shrink-0 mt-[2px]" />
      )}

      {/* Konten dokumen */}
      <div className="flex flex-col min-w-0">
        <Link
          href={`/produkhukum/${node.id}`}
          className="text-sm font-medium text-gray-800 hover:text-orange-600 truncate transition-colors"
          title={`${node.judul} (${node.nomor ?? "-"} / ${node.tahun ?? "-"})`}
        >
          {node.judul}
          <span className="text-gray-400 text-xs ml-1">
            ({node.nomor ?? "-"} / {node.tahun ?? "-"})
          </span>
        </Link>

        {/* Info tambahan (status & tipe) */}
        <div className="flex flex-wrap gap-1 mt-0.5 text-xs">
          {node.status_peraturan?.nama && (
            <span
              className={`px-2 py-0.5 rounded-full font-semibold text-[10px]
                ${
                  node.status_peraturan.nama === "Berlaku"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {node.status_peraturan.nama}
            </span>
          )}
          {node.tipe_dokumen?.nama && (
            <span className="text-gray-500 italic">{node.tipe_dokumen.nama}</span>
          )}
        </div>
      </div>
    </div>

    {/* Garis penghubung & anak (jika expanded) */}
    {hasChildren && expanded && (
      <div className="ml-5 mt-1 border-l-2 border-orange-100 pl-4">
        <TreeList nodes={node.children} level={level + 1} />
      </div>
    )}
  </li>
);
}