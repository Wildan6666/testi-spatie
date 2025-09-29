import { useState, useEffect } from "react";

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Inject @font-face + helper class sekali di <head>
    if (!document.getElementById("open-dyslexic-style")) {
      const style = document.createElement("style");
      style.id = "open-dyslexic-style";
      style.innerHTML = `
@font-face{
  font-family:'OpenDyslexic';
  src:url('https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/woff2/OpenDyslexic-Regular.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/otf/OpenDyslexic-Regular.otf') format('opentype');
  font-weight:400;
  font-style:normal;
  font-display:swap;
}
html.dyslexia-font, body.dyslexia-font{
  font-family:'OpenDyslexic', Arial, sans-serif !important;
}`;
      document.head.appendChild(style);
      // (opsional) pancing load
      if ("fonts" in document) document.fonts.load('1rem "OpenDyslexic"');
    }

    let fontSize = 100;
    let lineHeight = 1.5;
    let letterSpacing = 0;
    let boldActive = false;
    let dyslexiaActive = false;
    let highlightHeadings = false;
    let highlightLinks = false;

    // Persist jika sebelumnya aktif
    if (localStorage.getItem("dyslexia") === "1") {
      document.documentElement.classList.add("dyslexia-font");
      document.body.classList.add("dyslexia-font");
      dyslexiaActive = true;
    }

    // ✅ Ukuran Font
    window.increaseFont = function () {
      fontSize += 10;
      document.body.style.fontSize = fontSize + "%";
      const el = document.getElementById("fontSizeDisplay");
      if (el) el.innerText = fontSize + "%";
    };

    window.decreaseFont = function () {
      fontSize = Math.max(50, fontSize - 10);
      document.body.style.fontSize = fontSize + "%";
      const el = document.getElementById("fontSizeDisplay");
      if (el) el.innerText = fontSize + "%";
    };

    // ✅ Sorot Judul
    window.toggleHighlightHeadings = function () {
      highlightHeadings = !highlightHeadings;
      document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => {
        el.style.background = highlightHeadings ? "yellow" : "transparent";
      });
    };

    // ✅ Sorot Tautan
    window.toggleHighlightLinks = function () {
      highlightLinks = !highlightLinks;
      document.querySelectorAll("a").forEach((el) => {
        el.style.background = highlightLinks ? "lightblue" : "transparent";
      });
    };

    // ✅ Font Disleksia (pakai class agar pasti override Tailwind/theme)
    window.toggleDyslexiaFont = function () {
      dyslexiaActive = !dyslexiaActive;
      const root = document.documentElement;
      if (dyslexiaActive) {
        root.classList.add("dyslexia-font");
        document.body.classList.add("dyslexia-font");
        localStorage.setItem("dyslexia", "1");
        if ("fonts" in document) document.fonts.load('1rem "OpenDyslexic"');
      } else {
        root.classList.remove("dyslexia-font");
        document.body.classList.remove("dyslexia-font");
        localStorage.removeItem("dyslexia");
      }
    };

    // ✅ Jarak Huruf
    window.increaseLetterSpacing = function () {
      letterSpacing += 1;
      document.body.style.letterSpacing = letterSpacing + "px";
    };
    window.decreaseLetterSpacing = function () {
      letterSpacing = Math.max(0, letterSpacing - 1);
      document.body.style.letterSpacing = letterSpacing + "px";
    };

    // ✅ Tinggi Baris
    window.increaseLineHeight = function () {
      lineHeight += 0.2;
      document.body.style.lineHeight = lineHeight;
    };
    window.decreaseLineHeight = function () {
      lineHeight = Math.max(1, lineHeight - 0.2);
      document.body.style.lineHeight = lineHeight;
    };

    // ✅ Ketebalan Font
    window.toggleBold = function () {
      boldActive = !boldActive;
      document.body.style.fontWeight = boldActive ? "bold" : "normal";
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 left-5 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 hover:bg-blue-700 transition"
      >
        ♿
      </button>

      {/* Panel Aksesibilitas */}
      {open && (
        <div className="fixed bottom-24 left-5 bg-white p-4 rounded-xl shadow-lg w-72 z-50 font-sans border border-gray-200">
          <h3 className="text-lg font-bold text-center mb-3 text-gray-800">
            Aksesibilitas
          </h3>

          {/* Ukuran Font */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => window.decreaseFont()}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              A-
            </button>
            <span id="fontSizeDisplay" className="text-sm font-medium">
              100%
            </span>
            <button
              onClick={() => window.increaseFont()}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              A+
            </button>
          </div>

          {/* Grid Fitur */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => window.toggleHighlightHeadings()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Sorot Judul
            </button>
            <button
              onClick={() => window.toggleHighlightLinks()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Sorot Tautan
            </button>
            <button
              onClick={() => window.toggleDyslexiaFont()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Font Disleksia
            </button>
            <button
              onClick={() => window.toggleBold()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Ketebalan Font
            </button>
            <button
              onClick={() => window.increaseLetterSpacing()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              + Jarak Huruf
            </button>
            <button
              onClick={() => window.decreaseLetterSpacing()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              - Jarak Huruf
            </button>
            <button
              onClick={() => window.increaseLineHeight()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              + Tinggi Baris
            </button>
            <button
              onClick={() => window.decreaseLineHeight()}
              className="px-2 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              - Tinggi Baris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
