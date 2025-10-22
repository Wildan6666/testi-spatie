import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { LogOut, Languages, ChevronDown, ChevronUp } from "lucide-react";
import "../../../css/Navbar.css";
import "flag-icons/css/flag-icons.min.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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

  // 🔹 Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Load Google Translate
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
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          {/* 🔸 Hamburger + Judul */}
          <div className="mobile-header">
            <button
              className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {/* 🔸 Logo */}
          <div className="logo-container">
            <img
              src="/assets/LOGO-JDIHN.png"
              alt="Logo JDIHN"
              className="logo"
            />
            <Link href="/dashboard">
              <img
                src="/assets/LOGO-UNJA.png"
                alt="Logo UNJA"
                className="logo"
              />
            </Link>
          </div>

          {/* 🔸 Navigasi Utama */}
          <nav className={`navigation ${menuOpen ? "mobile-active" : ""}`}>
            {/* 🔹 Judul di dalam sidebar */}
            {menuOpen && (
              <div className="mobile-title">
                <h2>JDIH UNJA</h2>
              </div>
            )}

            <Link href="/dashboard" className="nav-link">
              Beranda
            </Link>

            {/* 🔹 Tentang Kami - Desktop Hover */}
            <div className="relative inline-block group desktop-only">
              <button className="nav-link">Tentang Kami</button>
              <div className="absolute left-0 mt-0 w-56 bg-white shadow-xl rounded-xl text-gray-800 z-50 hidden group-hover:block">
                <a
                  href="/Tentang/SekilasSejarah"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                >
                  Sekilas Sejarah
                </a>
                <a
                  href="/Tentang/DasarHukum"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dasar Hukum
                </a>
                <a
                  href="/Tentang/VisiMisi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Visi & Misi
                </a>
                <a
                  href="/Tentang/Organisasi"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                >
                  Struktur Organisasi
                </a>
              </div>
            </div>

            {/* 🔹 Tentang Kami - Mobile Dropdown */}
            <div className="mobile-only">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="nav-link flex justify-between items-center"
              >
                Tentang Kami
                {aboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {aboutOpen && (
                <div className="dropdown-content-mobile open">
                  <a href="/Tentang/SekilasSejarah" className="nav-link sub-link">
                    Sekilas Sejarah
                  </a>
                  <a href="/Tentang/DasarHukum" className="nav-link sub-link">
                    Dasar Hukum
                  </a>
                  <a href="/Tentang/VisiMisi" className="nav-link sub-link">
                    Visi & Misi
                  </a>
                  <a href="/Tentang/Organisasi" className="nav-link sub-link">
                    Struktur Organisasi
                  </a>
                </div>
              )}
            </div>

            <Link href="/produkhukum" className="nav-link">
              Dokumen Hukum
            </Link>

            {/* 🔹 Logout */}
            <Link
              href="/logout"
              method="post"
              as="button"
              className="login-button flex items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>

            {/* 🔹 Translate - Desktop Hover */}
            <div className="relative inline-block group desktop-only">
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
                      ${
                        index === languages.length - 1 ? "rounded-b-xl" : ""
                      }`}
                  >
                    <span className={`${lang.flag} fis text-lg`}></span>
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔹 Translate - Mobile Dropdown */}
            <div className="mobile-only">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="nav-link flex justify-between items-center"
              >
                <span className="flex items-center gap-2">
                  <Languages size={20} /> Translate
                </span>
                {langOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {langOpen && (
                <div className="dropdown-content-mobile open">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-3 sub-link"
                    >
                      <span className={`${lang.flag} fis text-lg`}></span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <div style={{ height: "80px" }}></div>
    </>
  );
}
