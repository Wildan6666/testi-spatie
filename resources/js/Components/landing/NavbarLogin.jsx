import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { LogIn, Languages } from "lucide-react";
import "../../../css/Navbar.css";
import "flag-icons/css/flag-icons.min.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const languages = [
    { code: "id", name: "Indonesia", flag: "fi fi-id" },
    { code: "en", name: "English", flag: "fi fi-gb" },
    { code: "zh-CN", name: "中文 (Chinese)", flag: "fi fi-cn" },
    { code: "ar", name: "العربية (Arabic)", flag: "fi fi-sa" },
    { code: "ja", name: "日本語 (Japanese)", flag: "fi fi-jp" },
    { code: "jw", name: "Basa Jawa", flag: "fi fi-id" },
    { code: "su", name: "Basa Sunda", flag: "fi fi-id" },
  ];

  // 🔸 Efek scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔸 Load Google Translate
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "id",
            includedLanguages: "id,en,zh-CN,ar,ja,jw,su",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    document.cookie = `googtrans=/id/${langCode};path=/`;
    window.location.reload();
  };

  return (
    <>
      {/* 🧭 Navbar */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          {/* Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <div className="logo-container">
            <img
              src="https://jdih.perpusnas.go.id/public/style/img/LOGO-JDIHN-PHN.png"
              alt="Logo JDIH"
              className="logo"
            />
            <Link href="/dashboard">
              <img
                src="https://agribisnis.unja.ac.id/wp-content/uploads/2019/11/cropped-Logo-UNJA.png"
                alt="Logo UNJA"
                className="logo cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`navigation ${menuOpen ? "mobile-active" : ""}`}>
            <Link href="/dashboard" className="nav-link">
              Beranda
            </Link>

            {/* Tentang Kami */}
            <div className="relative inline-block group">
              <button className="nav-link px-4 py-2 w-full text-left">
                Tentang Kami
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white shadow-xl rounded-xl text-gray-800 z-50 hidden group-hover:block">
                <a
                  href="/tentang/sekilas-sejarah"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                >
                  Sekilas Sejarah
                </a>
                <a
                  href="/tentang/dasar-hukum"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dasar Hukum
                </a>
                <a
                  href="/VisiMisi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Visi & Misi
                </a>
                <a
                  href="/tentang/struktur-organisasi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Struktur Organisasi
                </a>
                <a
                  href="/tentang/prosedur-operasional"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                >
                  Prosedur Operasional Standar
                </a>
              </div>
            </div>

            <Link href="/produkhukum" className="nav-link">
              Dokumen Hukum
            </Link>

            <Link href={route("login")} className="login-button flex items-center gap-2">
              <LogIn size={18} />
              <span>Login</span>
            </Link>

            {/* Google Translate (hidden widget) */}
            <div id="google_translate_element" style={{ display: "none" }}></div>

            {/* Dropdown Bahasa */}
            <div className="relative inline-block group">
              <button className="nav-link px-4 py-2 flex items-center gap-2">
                <Languages size={20} />
              </button>
              <div className="absolute right-0 mt-0 w-56 bg-white shadow-xl rounded-xl text-gray-800 z-50 hidden group-hover:block">
                {languages.map((lang, index) => (
                  <div
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer
                      ${index === 0 ? "rounded-t-xl" : ""}
                      ${index === languages.length - 1 ? "rounded-b-xl" : ""}`}
                  >
                    <span className={`${lang.flag} fis text-lg`}></span>
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* 🧱 Spacer agar konten tidak tertutup navbar */}
      <div style={{ height: "80px" }}></div>
    </>
  );
}
