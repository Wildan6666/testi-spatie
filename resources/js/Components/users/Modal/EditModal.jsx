import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/Dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function EditModal({ user, setEditUser, instansi }) {
  if (!user) return null;

  const isPegawai = user.roles?.some((r) => r.name === "pegawai");
  const isMahasiswa = user.roles?.some((r) => r.name === "mahasiswa");

  // === STATE TAMBAHAN UNTUK MODE RESET PASSWORD ===
  const [showResetForm, setShowResetForm] = useState(false);

  // === FORM UPDATE DETAIL ===
  const { data, setData, put, processing, reset, errors } = useForm({
    name: user.name || "",
    nip: user.detail?.nip || "",
    nim: user.detail?.nim || "",
    instansi_id: user.detail?.instansi_id || "",
    fakultas_id: user.detail?.fakultas_id || "",
    prodi_id: user.detail?.prodi_id || "",
    status_aktif: user.detail?.status_aktif || "aktif",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.users.updateDetail", user.id), {
      preserveScroll: true,
      onSuccess: () => setEditUser(null),
    });
  };

  // === FORM RESET PASSWORD ===
  const {
    data: passData,
    setData: setPassData,
    patch,
    processing: resetProcessing,
    errors: passErrors,
    reset: resetPassForm,
  } = useForm({
    password: "",
    password_confirmation: "",
  });

  const handleResetPassword = (e) => {
    e.preventDefault();
    patch(route("admin.users.resetPassword", user.id), {
      preserveScroll: true,
      onSuccess: () => {
        alert("Password berhasil diubah!");
        resetPassForm();
        setShowResetForm(false);
      },
    });
  };

  useEffect(() => () => reset(), []);

  return (
    <Dialog open={!!user} onOpenChange={() => setEditUser(null)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit Data Pengguna
          </DialogTitle>
        </DialogHeader>

        {/* === KONDISI: Jika sedang mode reset password === */}
        {showResetForm ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password Baru
              </label>
              <Input
                type="password"
                value={passData.password}
                onChange={(e) => setPassData("password", e.target.value)}
                placeholder="Masukkan password baru"
              />
              {passErrors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {passErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Konfirmasi Password
              </label>
              <Input
                type="password"
                value={passData.password_confirmation}
                onChange={(e) =>
                  setPassData("password_confirmation", e.target.value)
                }
                placeholder="Ulangi password baru"
              />
              {passErrors.password_confirmation && (
                <p className="text-xs text-red-500 mt-1">
                  {passErrors.password_confirmation}
                </p>
              )}
            </div>

            <DialogFooter className="flex justify-between pt-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowResetForm(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={resetProcessing}>
                {resetProcessing ? "Menyimpan..." : "Simpan Password"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          /* === FORM EDIT DETAIL USER === */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="text-sm font-medium text-gray-700">Nama</label>
              <Input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Nama pengguna"
              />
            </div>

            {isPegawai && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700">NIP</label>
                  <Input
                    value={data.nip}
                    onChange={(e) => setData("nip", e.target.value)}
                    placeholder="Masukkan NIP"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Instansi
                  </label>
                  <select
                    value={data.instansi_id}
                    onChange={(e) => setData("instansi_id", e.target.value)}
                    className="border rounded-md px-3 py-2 w-full text-sm"
                  >
                    <option value="">Pilih Instansi</option>
                    {instansi.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {isMahasiswa && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700">NIM</label>
                  <Input
                    value={data.nim}
                    onChange={(e) => setData("nim", e.target.value)}
                    placeholder="Masukkan NIM"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Fakultas
                  </label>
                  <Input
                    value={data.fakultas_id}
                    onChange={(e) => setData("fakultas_id", e.target.value)}
                    placeholder="Masukkan Fakultas"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Prodi
                  </label>
                  <Input
                    value={data.prodi_id}
                    onChange={(e) => setData("prodi_id", e.target.value)}
                    placeholder="Masukkan Prodi"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Status Akun
              </label>
              <select
                value={data.status_aktif}
                onChange={(e) => setData("status_aktif", e.target.value)}
                className="border rounded-md px-3 py-2 w-full text-sm"
              >
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>

            <DialogFooter className="flex justify-between pt-3">
              <Button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Reset Password
              </Button>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditUser(null)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
