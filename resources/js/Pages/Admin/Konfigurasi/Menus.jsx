import React, { useMemo, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { Plus, Edit3, Trash2, Search } from "lucide-react";

// ---------- helper kecil ----------
const IconPreview = ({ name, size = 18, className = "" }) => {
  if (!name || !Icons[name]) return <span className="text-gray-400">-</span>;
  const I = Icons[name];
  return <I size={size} className={className} />;
};

// ---------- panel form (slide-over kanan) ----------
function MenuFormPanel({
  open,
  onClose,
  isEdit,
  parentOptions,
  availableIcons,
  form,
  setData,
  onSubmit,
  processing,
  errors,
}) {
  return (
    <div
      className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b bg-orange-50/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-orange-700">
            {isEdit ? "Edit Menu" : "Tambah Menu"}
          </h3>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-5 space-y-4 overflow-y-auto h-[calc(100%-65px)]"
        >
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.url}
              onChange={(e) => setData("url", e.target.value)}
            />
            {errors?.url && (
              <p className="text-red-500 text-xs mt-1">{errors.url}</p>
            )}
          </div>

          {/* Parent */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Parent (opsional)
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.parent_id ?? ""}
              onChange={(e) =>
                setData(
                  "parent_id",
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
            >
              <option value="">— Menu Utama —</option>
              {parentOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.icon || ""}
              onChange={(e) => setData("icon", e.target.value)}
            >
              <option value="">— Pilih Icon —</option>
              {availableIcons.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>

            {/* preview */}
            {form.icon && (
              <div className="mt-2 inline-flex items-center gap-2 text-sm">
                <IconPreview name={form.icon} />
                <span>{form.icon}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex gap-2 justify-end">
            <Button
              type="button"
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button disabled={processing} type="submit">
              {processing ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Menus() {
  const { menus = [] } = usePage().props;

  // daftar icon yang kamu ijinkan
  const availableIcons = useMemo(
    () => [
      "Home",
      "Folder",
      "Archive",
      "FileText",
      "ScrollText",
      "Scale",
      "Search",
      "Newspaper",
      "Calendar",
      "BarChart",
      "Info",
      "Phone",
      "User",
      "Settings",
      "Tag",
      "Star",
      "Globe",
      "Circle",
      "Download",
    ],
    []
  );

  // flatten menu + child agar rapi di DataTable
  const rows = useMemo(() => {
    const out = [];
    menus.forEach((m) => {
      out.push({
        id: m.id,
        name: m.name,
        url: m.url,
        parent_id: null,
        parent_name: "-",
        icon: m.icon,
        isChild: false,
      });
      (m.children || []).forEach((c) => {
        out.push({
          id: c.id,
          name: c.name,
          url: c.url,
          parent_id: m.id,
          parent_name: m.name,
          icon: c.icon,
          isChild: true,
        });
      });
    });
    return out;
  }, [menus]);

  // search
  const [search, setSearch] = useState("");
  const filteredRows = useMemo(() => {
    if (!search) return rows;
    const s = search.toLowerCase();
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        (r.url || "").toLowerCase().includes(s) ||
        (r.parent_name || "").toLowerCase().includes(s)
    );
  }, [rows, search]);

  // form state
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: "",
    url: "",
    parent_id: null,
    icon: "",
  });

  const [panelOpen, setPanelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const openAdd = () => {
    reset();
    setIsEdit(false);
    setEditId(null);
    setPanelOpen(true);
  };

  const openEdit = (row) => {
    setData({
      name: row.name || "",
      url: row.url || "",
      parent_id: row.parent_id ?? null,
      icon: row.icon || "",
    });
    setIsEdit(true);
    setEditId(row.id);
    setPanelOpen(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route("menus.update", editId), {
        onSuccess: () => {
          setPanelOpen(false);
          setIsEdit(false);
          reset();
        },
      });
    } else {
      post(route("admin.menus.store"), {
        onSuccess: () => {
          setPanelOpen(false);
          reset();
        },
      });
    }
  };

  const onDelete = (id) => {
    if (!confirm("Yakin ingin menghapus menu ini?")) return;
    router.delete(route("admin.menus.destroy", id));
  };

  // kolom datatable
  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.isChild && <span className="text-gray-300">↳</span>}
          <span className={row.isChild ? "text-gray-700" : "font-medium"}>
            {row.name}
          </span>
        </div>
      ),
      grow: 2,
    },
    {
      name: "URL",
      selector: (row) => row.url || "-",
      sortable: true,
      wrap: true,
    },
    {
      name: "Parent",
      selector: (row) => row.parent_name || "-",
      sortable: true,
      width: "180px",
    },
    {
      name: "Icon",
      width: "140px",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <IconPreview name={row.icon} />
          <span className="text-xs text-gray-500">{row.icon || "-"}</span>
        </div>
      ),
    },
    {
      name: "Aksi",
      width: "150px",
      center: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="px-2 h-8 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
            onClick={() => openEdit(row)}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="px-2 h-8 bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
            onClick={() => onDelete(row.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-4">
        {/* header+actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Manajemen Menu</h2>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-1.5 border border-gray-200">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                className="bg-transparent border-none outline-none text-sm"
                placeholder="Cari nama / url / parent…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={openAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tambah Menu
            </Button>
          </div>
        </div>

        {/* DataTable */}
          <div className="bg-white rounded-xl shadow-md border border-orange-100">
  <DataTable
    columns={columns}
    data={filteredRows}
    pagination
    highlightOnHover
    responsive
    striped
    dense={false} // biar baris lebih renggang
    customStyles={{
      headCells: {
        style: {
          backgroundColor: "#fff7ed",
          color: "#ea580c",
          fontWeight: "700",
          fontSize: "15px",   // 🔸 lebih besar
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
      cells: {
        style: {
          fontSize: "15px",   // 🔸 isi tabel lebih besar
          color: "#374151",
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
      rows: {
        style: {
          minHeight: "56px",  // 🔸 baris sedikit lebih tinggi
        },
      },
      pagination: {
        style: {
          color: "#ea580c",
          fontWeight: "600",
          fontSize: "14px",
          paddingTop: "10px",
          paddingBottom: "10px",
        },
      },
    }}
  />
</div>
</div>


      {/* Slide-over Panel Form */}
      <MenuFormPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        isEdit={isEdit}
        parentOptions={menus} // parent hanya dari menu utama (opsional: filter yang parent_id null)
        availableIcons={availableIcons}
        form={data}
        setData={setData}
        onSubmit={onSubmit}
        processing={processing}
        errors={errors}
      />
    </AdminLayout>
  );
}
