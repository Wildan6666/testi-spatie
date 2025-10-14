import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/landing/Navbar';
import Footer from '@/Components/landing/Footer';
import { Network, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamData = [
  {
    name: 'Prof. Dr. H. Sutrisno, M.Ag.',
    title: 'Penanggung Jawab',
    photoUrl:
      'https://ui-avatars.com/api/?name=Sutrisno&background=ea580c&color=fff&size=256&font-size=0.33',
  },
  {
    name: 'Dr. Retno Kusniati, S.H., M.Hum.',
    title: 'Ketua Pengelola JDIH',
    photoUrl:
      'https://ui-avatars.com/api/?name=Retno+Kusniati&background=ea580c&color=fff&size=256&font-size=0.33',
  },
  {
    name: 'Dr. M. Syahlan Samosir, S.H., M.H.',
    title: 'Koordinator Dokumentasi',
    photoUrl:
      'https://ui-avatars.com/api/?name=Syahlan+Samosir&background=ea580c&color=fff&size=256&font-size=0.33',
  },
  {
    name: 'Andi Najemi, S.H., M.H.',
    title: 'Koordinator Publikasi & IT',
    photoUrl:
      'https://ui-avatars.com/api/?name=Andi+Najemi&background=ea580c&color=fff&size=256&font-size=0.33',
  },
];

export default function StrukturOrganisasi() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Head title="Struktur Organisasi JDIH" />
      <Navbar />

      <main className="font-sans pt-28 min-h-screen">
        {/* === HERO SECTION (PUTIH) === */}
        <section className="bg-white py-20 px-6 text-center border-b border-orange-100">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <Network size={48} className="mx-auto text-orange-600 mb-4" />
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4">
              Struktur Organisasi
            </h1>
            <p
              className="text-lg text-slate-600 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Struktur organisasi JDIH Universitas Jambi yang solid dan terintegrasi untuk
              memastikan pengelolaan informasi hukum yang efektif dan efisien.
            </p>
          </div>
        </section>

        {/* === BAGAN ORGANISASI === */}
        <section className="py-16 lg:py-20 px-6 bg-white">
          <div
            className="max-w-7xl mx-auto"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-white">
              <img
                src="https://ilkum.upnjatim.ac.id/images/STRUKTUR-ORGANISASI-FAKULTAS-HUKUM-NEW.jpg"
                alt="Bagan Struktur Organisasi JDIH"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* === TIM PENGELOLA (GRADIENT MENYATU DENGAN FOOTER) === */}
        <section
          className="py-16 lg:py-20 px-6 transition-all duration-700"
          style={{
            background:
              'linear-gradient(to bottom, #ffffff 0%, #fff6ef 25%, #ffe3d0 55%, #f2a87e 85%, #e89876 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div data-aos="fade-up">
              <Users size={40} className="mx-auto text-orange-600 mb-3" />
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mb-4">
                Tim Pengelola JDIH
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-12">
                Para profesional yang berdedikasi dan bertanggung jawab atas operasional
                JDIH Universitas Jambi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamData.map((member, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-6 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:bg-orange-50 border border-transparent hover:border-orange-200"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <img
                    src={member.photoUrl}
                    alt={`Foto ${member.name}`}
                    className="w-32 h-32 rounded-full mx-auto mb-5 object-cover border-4 border-white shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mt-1">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
