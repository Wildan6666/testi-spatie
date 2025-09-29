import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { beritaTerkini } from "../../Pages/dummy";

export default function BeritaTerkini() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // update jumlah item per layar
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // auto slide tiap 5 detik
  const maxSlides = Math.max(0, beritaTerkini.length - itemsPerView);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxSlides]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index) => setCurrentSlide(Math.min(index, maxSlides));

  return (
    <section className="section-gradient" data-aos="fade-up">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          className="font-inter font-bold text-[48px] leading-[58px] text-center text-orange-500"
          data-aos="fade-up"
        >
          Berita Terkini
        </h2>

        {/* Slider */}
        <div className="slider-container" data-aos="zoom-in-up">
          <div className="slider-wrapper">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              }}
            >
              {beritaTerkini.map((news, index) => (
                <div
                  key={`${news.id}-${index}`}
                  className="slide"
                  style={{
                    flex: `0 0 ${100 / itemsPerView}%`,
                    maxWidth: `${100 / itemsPerView}%`,
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="card ">
                    <div className="card-image">
                      <img src={news.image} alt={news.title} />
                      <div className="card-overlay"></div>
                    </div>
                    <div className="card-content">
                      <div className="card-date">
                        <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 0 0-1 1v18l7-3 7 3V3a1 1 0 0 0-1-1H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>{news.date}</p>
                      </div>
                      <h3 className="card-title">{news.title}</h3>
                      <p className="card-desc">{news.description}</p>
                      <a href="/Berita" className="card-link">
                        Baca Selengkapnya
                        <svg
                          className="icon ml"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          {maxSlides > 0 && (
            <div className="indicators">
              {Array.from({ length: maxSlides + 1 }, (_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <button
          className="nav-btn left"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          data-aos="fade-right"
        >
          <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="nav-btn right"
          onClick={nextSlide}
          disabled={currentSlide >= maxSlides}
          data-aos="fade-left"
        >
          <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
