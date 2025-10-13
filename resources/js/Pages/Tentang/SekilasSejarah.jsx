import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/landing/Navbar';
import Footer from '@/Components/landing/Footer';
import { History, Milestone, Landmark, FileCheck, Award, Flag, GitBranch, Lightbulb } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Data untuk Timeline Sejarah
const timelineData = [
    {
        year: '1974',
        title: 'Awal Mula: Seminar Hukum Nasional III',
        icon: <Lightbulb size={24} />,
        content: (
            <>
                <p>Secara historis, pembentukan JDIHN merupakan rekomendasi dari Seminar Hukum Nasional III di Surabaya. Seminar ini menyoroti kelemahan dokumentasi hukum nasional yang belum mampu menyediakan informasi secara cepat dan tepat.</p>
                <h4 className="font-semibold mt-4 mb-2 text-slate-700">Faktor Penyebab Kelemahan:</h4>
                <ul className="list-decimal list-inside space-y-2 text-slate-600">
                    <li>Dokumen hukum tersebar luas di berbagai instansi.</li>
                    <li>Pengelolaan dokumen yang belum tersistem dengan baik.</li>
                    <li>Sangat kurangnya tenaga pengelola yang kompeten.</li>
                    <li>Kurangnya perhatian terhadap dokumentasi dan perpustakaan hukum.</li>
                </ul>
            </>
        ),
    },
    {
        year: '1978',
        title: 'Penunjukan BPHN sebagai Pusat Jaringan',
        icon: <Landmark size={24} />,
        content: (
            <p>
                Lokakarya di Jakarta menunjuk Badan Pembinaan Hukum Nasional (BPHN) sebagai Pusat Jaringan. BPHN diberi tugas sebagai penyelenggara latihan, tempat konsultasi, pusat penelitian dan pengembangan, serta koordinator kegiatan unit-unit jaringan.
            </p>
        ),
    },
    {
        year: '1988',
        title: 'Penerbitan Manual Unit JDIH',
        icon: <FileCheck size={24} />,
        content: (
            <p>
                BPHN mengeluarkan pedoman pengelolaan dokumen hukum yang diberi nama "Manual Unit Jaringan Dokumentasi dan Informasi Hukum". Manual ini terdiri dari 5 modul yang menjadi standar kerja bagi seluruh unit jaringan.
            </p>
        ),
    },
    {
        year: '1999 & 2012',
        title: 'Penguatan Kebijakan Nasional',
        icon: <Flag size={24} />,
        content: (
             <>
                <p>Terbit Keppres No. 91 Tahun 1999, yang kemudian direvitalisasi dan diganti dengan <strong>Peraturan Presiden No. 33 Tahun 2012</strong> tentang JDIHN. Perpres ini mempertegas tujuan JDIHN:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 mt-4">
                    <li>Menjamin pengelolaan dokumentasi hukum yang terpadu dan terintegrasi.</li>
                    <li>Menjamin ketersediaan informasi hukum yang lengkap, akurat, dan mudah diakses.</li>
                    <li>Mengembangkan kerja sama yang efektif antar anggota jaringan.</li>
                    <li>Meningkatkan kualitas pembangunan hukum dan pelayanan publik.</li>
                </ul>
             </>
        ),
    },
    {
        year: '2019',
        title: 'Standarisasi Pengelolaan Modern',
        icon: <Award size={24} />,
        content: (
            <>
                <p>Untuk menyesuaikan perkembangan teknologi, terbit <strong>Permenkumham No. 8 Tahun 2019</strong> tentang Standar Pengelolaan Dokumen dan Informasi Hukum. Standar ini menjadi pedoman wajib bagi seluruh anggota JDIHN.</p>
            </>
        ),
    },
];

export default function SekilasSejarah() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: 'ease-out-cubic',
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <Head title="Sekilas Sejarah JDIH" />
            <Navbar />

            <main className="bg-white font-sans pt-28">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20 px-6 text-center border-b border-orange-200">
                    <div className="max-w-4xl mx-auto" data-aos="fade-up">
                        <History size={48} className="mx-auto text-orange-600 mb-4" />
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4">
                            Sekilas Sejarah JDIHN
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                            Menelusuri jejak langkah pembentukan Jaringan Dokumentasi dan Informasi Hukum Nasional, dari gagasan awal hingga menjadi pilar keterbukaan informasi hukum di Indonesia.
                        </p>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-16 lg:py-20 px-6 bg-slate-50">
                    <div className="relative max-w-5xl mx-auto">
                        {/* Garis Timeline Vertikal */}
                        <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-orange-200 transform md:-translate-x-1/2"></div>

                        {timelineData.map((item, index) => (
                            <div key={index} className="relative mb-12">
                                {/* Ikon di Tengah */}
                                <div className="absolute left-4 md:left-1/2 top-0 z-10 transform -translate-x-1/2">
                                    <div className="bg-orange-600 text-white rounded-full p-3 shadow-lg ring-8 ring-slate-50">
                                        {item.icon}
                                    </div>
                                </div>
                                
                                {/* Konten Kartu */}
                                <div 
                                    className={`
                                        w-[calc(100%-4rem)] ml-auto md:w-5/12 p-6 bg-white rounded-xl shadow-lg border border-slate-200
                                        ${index % 2 === 0 ? 'md:mr-[calc(50%+2rem)] md:ml-0' : 'md:ml-[calc(50%+2rem)]'}
                                    `}
                                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                                >
                                    <h2 className="text-2xl font-bold text-orange-600 mb-2">{item.year}</h2>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h3>
                                    <div className="text-slate-600 leading-relaxed space-y-3">{item.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                     {/* Blok Kesimpulan */}
                     <div className="max-w-4xl mx-auto mt-12" data-aos="fade-up" data-aos-delay="300">
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                            <h3 className="text-xl font-semibold text-orange-800 mb-2 flex items-center">
                                <GitBranch className="mr-3" />
                                Membangun Akses Informasi Terintegrasi
                            </h3>
                            <p className="text-orange-700 leading-relaxed">
                                Sejarah pembentukan JDIHN menunjukkan betapa pentingnya kerjasama pengelolaan dokumen dan informasi hukum untuk mempercepat pembangunan hukum nasional yang berkualitas. Oleh karena itu, semua Anggota JDIHN wajib mengelola dokumen dan informasi hukum dengan memanfaatkan kecanggihan teknologi untuk membangun akses informasi yang terintegrasi.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}