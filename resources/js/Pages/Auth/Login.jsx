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
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"), { onFinish: () => reset("password") });
  };

  // === Tahap 1: Jalankan reload terlebih dahulu ===
  useEffect(() => {
    // ⛔ Jangan render apa pun dulu sebelum reload
    document.body.style.margin = "0";
    //document.body.style.backgroundColor = "#111827";
    //document.documentElement.style.backgroundColor = "#111827";

    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("hasReloaded");

      // Preload background setelah reload
      const img = new Image();
      img.src = "/assets/gerbang.jpg";
      img.onload = () => {
        setBgLoaded(true);
        setTimeout(() => {
          setIsLoading(false);
          setIsReady(true);
        }, 800);
      };
    }
  }, []);

  // === Loading screen full page ===
  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#111827",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#f97316",
          fontWeight: "600",
          fontSize: "1.25rem",
          gap: "16px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        {/* 🔄 Spinner */}
        <div
          style={{
            width: "64px",
            height: "64px",
            border: "6px solid rgba(255,255,255,0.15)",
            borderTopColor: "#f97316",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        <p
          style={{
            animation: "pulse 1.5s ease-in-out infinite",
            color: "#f97316",
          }}
        >
          Memuat halaman login...
        </p>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
          `}
        </style>
      </div>
    );
  }

  // Jangan render halaman sampai benar-benar siap
  if (!isReady) return null;

  // === Tahap 3: Render halaman login ===
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#111827",
        backgroundImage:
        "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('/assets/gerbang.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}
    >
    <Head title="Login - JDIH Universitas Jambi" />

      {/* Header */}
    <header className="text-center px-6 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            Selamat Datang di
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 drop-shadow-lg mt-1 leading-snug">
            Jaringan Dokumentasi dan Informasi Hukum
            <br className="hidden sm:block" />
            Universitas Jambi
        </h2>
        </header>

      {/* Login Form */}
        <main className="w-full max-w-md px-6 sm:px-0">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8">
            {status && (
            <div className="mb-4 text-sm font-medium text-green-600 text-center bg-green-50 p-3 rounded-lg">
                {status}
            </div>
        )}

        <form onSubmit={submit} className="space-y-4">
            {/* Username */}
            <div>
            <InputLabel htmlFor="email" value="Masukkan Username" />
            <TextInput
                id="email"
                type="text"
                name="email"
                value={data.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
                placeholder="Password"
                />
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <InputError message={errors.password} className="mt-1" />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
                <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
                className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
            </label>

            {canResetPassword && (
                <Link
                href={route("password.request")}
                className="text-orange-500 hover:text-orange-600 hover:underline transition-colors"
                >
                Forgot Password?
                </Link>
            )}
            </div>

            {/* Tombol Submit */}
            <div className="pt-4">
            <PrimaryButton
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex justify-center"
                disabled={processing}
            >
                {processing ? "Memproses..." : "Masuk"}
                </PrimaryButton>
            </div>
            </form>
        </div>
        </main>

            <footer className="h-12 sm:h-16"></footer>
        </div>
    );
}
