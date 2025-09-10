import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
  const { documentTypes, lawTypes, statuses, verifikasiList, institutions } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    judul: "",
    nomor: "",
    tahun: "",
    file: null,
    document_type_id: "",
    law_type_id: "",
    status_id: "",
    verifikasi_id: "",
    institution_id: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("dokumen.store"), { forceFormData: true }); // supaya upload file bisa
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Dokumen</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Judul</label>
          <input
            type="text"
            value={data.judul}
            onChange={(e) => setData("judul", e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.judul && <div className="text-red-500">{errors.judul}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium">Nomor</label>
          <input
            type="text"
            value={data.nomor}
            onChange={(e) => setData("nomor", e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tahun</label>
          <input
            type="number"
            value={data.tahun}
            onChange={(e) => setData("tahun", e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">File</label>
          <input
            type="file"
            onChange={(e) => setData("file", e.target.files[0])}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tipe Dokumen</label>
          <select
            value={data.document_type_id}
            onChange={(e) => setData("document_type_id", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih --</option>
            {documentTypes?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Jenis Hukum</label>
          <select
            value={data.law_type_id}
            onChange={(e) => setData("law_type_id", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih --</option>
            {lawTypes?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={data.status_id}
            onChange={(e) => setData("status_id", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih --</option>
            {statuses?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Verifikasi</label>
          <select
            value={data.verifikasi_id}
            onChange={(e) => setData("verifikasi_id", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih --</option>
            {verifikasiList?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Institusi</label>
          <select
            value={data.institution_id}
            onChange={(e) => setData("institution_id", e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih --</option>
            {institutions?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
