// resources/js/Pages/Admin/Verifikasi.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function Verifikasi({ auth }) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Verifikasi Data" />
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Verifikasi Data</h1>
        <p className="text-gray-600">
          Silakan cek daftar pengguna berikut dan lakukan verifikasi.
        </p>

        {/* Contoh daftar user menunggu verifikasi */}
        <div className="space-y-4">
          {[1, 2, 3].map((id) => (
            <Card key={id} className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-lg">Data Pengguna #{id}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Nama</p>
                  <p>User {id}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p>user{id}@mail.com</p>
                </div>
                <div>
                  <p className="font-medium">NIK</p>
                  <p>1234567890{id}</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <span className="inline-flex items-center gap-1 text-yellow-600">
                    <Loader2 className="w-4 h-4 animate-spin" /> Menunggu Verifikasi
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button variant="destructive" className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Tolak
                </Button>
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" /> Terima
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
