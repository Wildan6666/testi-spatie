import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"), { onFinish: () => reset("password") });
  };

  // === Inisialisasi sederhana tanpa animasi ===
  useEffect(() => {
    setTimeout(() => setIsReady(true), 300);
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-orange-500 font-semibold text-lg">
        <p>Memuat halaman login...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(17,24,39,0.9)), url('/assets/gerbang.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Head title="Login - JDIH Universitas Jambi" />

      <div className="absolute inset-0 "></div>

      {/* --- Header --- */}
      <header className="text-center text-white mb-6 sm:mb-10 z-10">
        <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
          Selamat Datang di
        </h1>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-400 mt-1 leading-snug drop-shadow-lg">
          Jaringan Dokumentasi dan Informasi Hukum
          <br className="hidden sm:block" />
          Universitas Jambi
        </h2>
      </header>

      {/* Card Login */}
      <main className="w-full max-w-sm sm:max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 z-10">
        {status && (
          <div className="mb-4 text-sm font-medium text-green-600 text-center bg-green-50 p-3 rounded-lg">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          {/* Username */}
          <div>
            <InputLabel htmlFor="email" value="Masukkan Username" />
            <TextInput
              id="email"
              type="text"
              name="email"
              value={data.email}
              className="mt-1 block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              autoComplete="username"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="contoh: superadmin@unja.ac.id"
            />
            <InputError message={errors.email} className="mt-1" />
          </div>

          {/* Password */}
          <div>
            <InputLabel htmlFor="password" value="Masukkan Password" />
            <div className="relative">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                className="mt-1 block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10 transition"
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-500 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <InputError message={errors.password} className="mt-1" />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm gap-3 flex-wrap sm:flex-nowrap">
            <label className="flex items-center text-gray-700">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
                className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
              <span className="ml-2 whitespace-nowrap">Ingat saya</span>
            </label>

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="text-orange-500 hover:text-orange-600 hover:underline transition"
              >
                Lupa Password?
              </Link>
            )}
          </div>

          {/* Tombol Submit */}
          <div className="pt-2">
            <PrimaryButton
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base transition-colors flex justify-center"
              disabled={processing}
            >
              {processing ? "Memproses..." : "Masuk"}
            </PrimaryButton>
          </div>
        </form>
      </main>

      {/* --- Footer --- */}
      <footer className="text-center text-gray-300 text-xs mt-8 z-10">
        © {new Date().getFullYear()} JDIH Universitas Jambi.
      </footer>
    </div>
  );
}
