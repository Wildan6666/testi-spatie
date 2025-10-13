import { useState, useEffect } from "react";
import {
  FaSun, FaMoon, FaAdjust, FaFont, FaTimes,
  FaTextHeight, FaTextWidth, FaLink, FaHeading, FaSync
} from "react-icons/fa";
import "../../../css/accessbility.css"; 

// === SVG ICON MATERIAL accessibility_new ===
function AccessibilityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="28px"
      viewBox="0 -960 960 960"
      width="28px"
      fill="#ffffff"
    >
      <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520q-60-5-122-15t-118-25l20-80q78 21 166 30.5t174 9.5q86 0 174-9.5T820-720l20 80q-56 15-118 25t-122 15v520h-80v-240h-80v240h-80Z"/>
    </svg>
  );
}

const FeatureButton = ({ icon, text, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`feature-button ${isActive ? "active" : ""}`}
  >
    <div className="feature-icon">{icon}</div>
    <span className="feature-label">{text}</span>
  </button>
);

const initialSettings = {
  theme: 'light',
  dyslexiaFont: false,
  highlightHeadings: false,
  highlightLinks: false,
  fontSize: 100,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'high-contrast');
    if (settings.theme === 'dark') root.classList.add('dark');
    else if (settings.theme === 'contrast') root.classList.add('high-contrast');

    root.classList.toggle('dyslexia-font', settings.dyslexiaFont);
    root.dataset.highlightHeadings = settings.highlightHeadings;
    root.dataset.highlightLinks = settings.highlightLinks;

    root.style.setProperty('--font-size-multiplier', `${settings.fontSize / 100}`);
    root.style.setProperty('--line-height', settings.lineHeight);
    root.style.setProperty('--letter-spacing', `${settings.letterSpacing}px`);

    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('accessibilitySettings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (error) {
      console.error("Gagal memuat pengaturan aksesibilitas:", error);
      setSettings(initialSettings);
    }
  }, []);

  const toggleTheme = (theme) => setSettings(s => ({ ...s, theme }));
  const toggleDyslexiaFont = () => setSettings(s => ({ ...s, dyslexiaFont: !s.dyslexiaFont }));
  const toggleHighlightHeadings = () => setSettings(s => ({ ...s, highlightHeadings: !s.highlightHeadings }));
  const toggleHighlightLinks = () => setSettings(s => ({ ...s, highlightLinks: !s.highlightLinks }));
  const changeFontSize = (amount) => setSettings(s => ({ ...s, fontSize: Math.max(50, s.fontSize + amount) }));
  const changeLineHeight = (amount) => setSettings(s => ({ ...s, lineHeight: Math.max(1, s.lineHeight + amount) }));
  const changeLetterSpacing = (amount) => setSettings(s => ({ ...s, letterSpacing: Math.max(0, s.letterSpacing + amount) }));
  const resetAccessibility = () => setSettings(initialSettings);

  return (
    <>
      {/* === Tombol Utama dengan SVG Icon === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-toggle"
        aria-label="Buka Menu Aksesibilitas"
      >
        <AccessibilityIcon />
      </button>

      {/* === Panel Menu Aksesibilitas === */}
      {isOpen && (
        <div className="accessibility-panel">
          <div className="panel-header">
            <h3 className="panel-title">Menu Aksesibilitas</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="close-button"
              aria-label="Tutup Menu Aksesibilitas"
            >
              <FaTimes />
            </button>
          </div>

          <div className="section">
            <p className="section-title">Konten & Tampilan</p>
            <div className="feature-grid">
              <FeatureButton icon={<FaSun />} text="Light" onClick={() => toggleTheme('light')} isActive={settings.theme === 'light'} />
              <FeatureButton icon={<FaMoon />} text="Dark" onClick={() => toggleTheme('dark')} isActive={settings.theme === 'dark'} />
              <FeatureButton icon={<FaAdjust />} text="Kontras" onClick={() => toggleTheme('contrast')} isActive={settings.theme === 'contrast'} />
              <FeatureButton icon={<FaFont />} text="Disleksia" onClick={toggleDyslexiaFont} isActive={settings.dyslexiaFont} />
              <FeatureButton icon={<FaHeading />} text="Sorot Judul" onClick={toggleHighlightHeadings} isActive={settings.highlightHeadings} />
              <FeatureButton icon={<FaLink />} text="Sorot Tautan" onClick={toggleHighlightLinks} isActive={settings.highlightLinks} />
            </div>
          </div>

          <div className="section">
            <p className="section-title">Ukuran & Spasi</p>
            <div className="font-size-control">
              <span className="label">Ukuran Font</span>
              <div className="font-size-buttons">
                <button onClick={() => changeFontSize(-10)}>-</button>
                <span className="font-size-value">{settings.fontSize}%</span>
                <button onClick={() => changeFontSize(10)}>+</button>
              </div>
            </div>
            <div className="spacing-grid">
              <button onClick={() => changeLineHeight(0.2)}><FaTextHeight /> +Tinggi</button>
              <button onClick={() => changeLineHeight(-0.2)}><FaTextHeight /> -Tinggi</button>
              <button onClick={() => changeLetterSpacing(0.1)}><FaTextWidth /> +Jarak</button>
              <button onClick={() => changeLetterSpacing(-0.1)}><FaTextWidth /> -Jarak</button>
            </div>
          </div>

          <div className="reset-section">
            <button onClick={resetAccessibility} className="reset-button">
              <FaSync /> Reset Pengaturan
            </button>
          </div>
        </div>
      )}
    </>
  );
}
