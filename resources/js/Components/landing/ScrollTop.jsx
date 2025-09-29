import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-[1100] 
                     p-3 rounded-full 
                     bg-gradient-to-r from-orange-600 to-orange-400 
                     text-white shadow-lg 
                     transition-all duration-300 
                     hover:scale-110 hover:from-orange-700 hover:to-orange-500"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
}
