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
    <li className="my-2">
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 rounded-md py-1 px-2 transition-colors"
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown size={14} className="text-orange-500 flex-shrink-0" />
          ) : (
            <ChevronRight size={14} className="text-orange-500 flex-shrink-0" />
          )
        ) : (
          <FileText size={14} className="text-gray-400 flex-shrink-0" />
        )}

        <Link
          href={`/dokumen/${node.id}`}
          className="text-sm text-gray-700 hover:text-orange-600 font-medium truncate"
          title={`${node.judul} (${node.nomor ?? "-"} / ${node.tahun ?? "-"})`}
        >
          {node.judul}{" "}
          <span className="text-gray-400 text-xs">
            ({node.nomor ?? "-"} / {node.tahun ?? "-"})
          </span>
        </Link>
      </div>

      {/* Anak (jika expanded) */}
      {hasChildren && expanded && (
        <div className="ml-3 border-l border-orange-100">
          <TreeList nodes={node.children} level={level + 1} />
        </div>
      )}
    </li>
  );
}
