import React, { useState } from 'react';

export default function TentangKamiJDIH() {
  const [activeSection, setActiveSection] = useState('sejarah');
  
  const sections = [
    { id: 'sejarah', title: 'Sejarah JDIH', icon: '📜' },
    { id: 'dasar-hukum', title: 'Dasar Hukum', icon: '⚖️' },
    { id: 'visi-misi', title: 'Visi & Misi', icon: '🎯' }
  ];

  const stats = [
    { value: '50,000+', label: 'Dokumen Hukum', icon: '📋', color: 'from-orange-400 to-red-500' },
    { value: '34', label: 'Provinsi Terhubung', icon: '🏛️', color: 'from-orange-500 to-amber-500' },
    { value: '500+', label: 'Instansi Partner', icon: '🤝', color: 'from-amber-400 to-orange-500' },
    { value: '24/7', label: 'Akses Online', icon: '🌐', color: 'from-red-400 to-orange-500' }
  ];

  const timeline = [
    { 
      year: '2008', 
      title: 'Pendirian JDIH', 
      desc: 'Ditetapkan melalui UU No. 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan',
      color: 'bg-orange-500'
    },
    { 
      year: '2012', 
      title: 'Implementasi Sistem', 
      desc: 'Mulai beroperasi secara nasional dengan menghubungkan berbagai instansi pemerintah',
      color: 'bg-amber-500'
    },
    { 
      year: '2018', 
      title: 'Digitalisasi Penuh', 
      desc: 'Transformasi digital dengan sistem terintegrasi dan akses online 24/7',
      color: 'bg-orange-600'
    },
    { 
      year: '2024', 
      title: 'JDIH 4.0', 
      desc: 'Era baru dengan AI assistance dan smart document management system',
      color: 'bg-red-500'
    }
  ];

  const services = [
    { 
      title: 'Database Peraturan', 
      desc: 'Akses lengkap ke semua peraturan perundang-undangan yang berlaku',
      icon: '📊',
      features: ['Pencarian Advanced', 'Filter Kategori', 'Download PDF', 'Bookmark']
    },
    { 
      title: 'Monitoring Hukum', 
      desc: 'Pantau perkembangan dan perubahan regulasi terbaru secara real-time',
      icon: '👁️‍🗨️',
      features: ['Alert Sistem', 'Tracking Changes', 'Timeline Update', 'Newsletter']
    },
    { 
      title: 'Analisis Legal', 
      desc: 'Tools untuk analisis dampak hukum dan harmonisasi peraturan',
      icon: '🔍',
      features: ['Legal Analytics', 'Impact Assessment', 'Compliance Check', 'Report Generator']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-lg border-b-2 border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="text-white text-2xl font-bold">⚖️</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sistem JDIH</h1>
                <p className="text-sm text-orange-600 font-medium">Jaringan Dokumentasi & Informasi Hukum</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              {['Beranda', 'Tentang', 'Peraturan', 'Pencarian', 'Berita', 'Kontak'].map((item) => (
                <a 
                  key={item} 
                  href="/dashboard" 
                  className={`font-medium transition-all duration-300 hover:scale-105 ${
                    item === 'Tentang' 
                      ? 'text-orange-600 border-b-2 border-orange-600' 
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Akses Sistem
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-semibold mb-8 border border-orange-200">
            <span className="animate-pulse mr-2">🔥</span>
            Sistem Informasi Hukum Terdepan di Indonesia
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
              Tentang
            </span>
            <br />
            <span className="text-gray-800">Sistem JDIH</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
            Jaringan Dokumentasi dan Informasi Hukum yang menyediakan akses mudah, cepat, dan akurat 
            terhadap seluruh produk hukum di Indonesia
          </p>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-20 h-1 bg-gradient-to-l from-orange-500 to-transparent rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg">
              Jelajahi Sistem
            </button>
            <button className="bg-white/80 text-orange-600 px-8 py-4 rounded-2xl font-semibold border-2 border-orange-200 hover:bg-orange-50 hover:scale-105 transition-all duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 group border border-orange-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <span className="text-2xl text-white">{stat.icon}</span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-105 border-2 border-orange-300'
                    : 'bg-white/80 text-gray-700 hover:bg-orange-50 hover:shadow-lg hover:scale-105 border-2 border-orange-100'
                }`}
              >
                <span className="text-2xl">{section.icon}</span>
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Sejarah JDIH */}
          {activeSection === 'sejarah' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-orange-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white text-center">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
                  <span className="text-5xl mr-4">📜</span>
                  Sejarah & Perkembangan JDIH
                </h2>
                <p className="text-xl opacity-90">Perjalanan transformasi dokumentasi hukum di Indonesia</p>
              </div>
              
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500">
                      <h3 className="text-2xl font-bold text-orange-700 mb-4">Latar Belakang</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Sistem JDIH lahir dari kebutuhan mendesak untuk menciptakan sistem dokumentasi hukum yang 
                        terintegrasi, mudah diakses, dan selalu terkini. Sebelumnya, akses terhadap dokumen hukum 
                        tersebar di berbagai instansi tanpa koordinasi yang baik.
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-500">
                      <h3 className="text-2xl font-bold text-amber-700 mb-4">Tujuan Pembentukan</h3>
                      <div className="space-y-3">
                        {[
                          'Menyediakan akses mudah ke dokumen hukum',
                          'Meningkatkan transparansi regulasi',
                          'Mendukung good governance',
                          'Mempercepat proses pembentukan hukum'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Timeline Perkembangan</h3>
                    {timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {item.year}
                        </div>
                        <div className="flex-1 bg-gray-50 p-4 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                          <h4 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dasar Hukum */}
          {activeSection === 'dasar-hukum' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-orange-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white text-center">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
                  <span className="text-5xl mr-4">⚖️</span>
                  Dasar Hukum JDIH
                </h2>
                <p className="text-xl opacity-90">Landasan legal operasional Sistem JDIH</p>
              </div>
              
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl text-white">📋</span>
                      </div>
                      <h3 className="text-2xl font-bold text-orange-700">Peraturan Utama</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/70 p-4 rounded-xl">
                        <h4 className="font-bold text-gray-800">UU No. 12 Tahun 2011</h4>
                        <p className="text-sm text-gray-600">Tentang Pembentukan Peraturan Perundang-undangan</p>
                      </div>
                      <div className="bg-white/70 p-4 rounded-xl">
                        <h4 className="font-bold text-gray-800">PP No. 33 Tahun 2012</h4>
                        <p className="text-sm text-gray-600">Tentang Jaringan Dokumentasi dan Informasi Hukum</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl text-white">🏛️</span>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-700">Kewenangan</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Mengelola dokumen hukum nasional',
                        'Menyediakan akses informasi hukum',
                        'Melakukan sinkronisasi data',
                        'Memberikan layanan penelusuran'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-white/70 p-3 rounded-lg">
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-3xl border-2 border-red-200">
                  <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">Struktur Organisasi JDIH</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-2xl">🏢</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">JDIH Nasional</h4>
                      <p className="text-sm text-gray-600">Kementerian Hukum dan HAM</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-2xl">🌟</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">JDIH Daerah</h4>
                      <p className="text-sm text-gray-600">Provinsi & Kabupaten/Kota</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-2xl">🔗</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">JDIH Instansi</h4>
                      <p className="text-sm text-gray-600">Kementerian & Lembaga</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visi Misi */}
          {activeSection === 'visi-misi' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-orange-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white text-center">
                <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
                  <span className="text-5xl mr-4">🎯</span>
                  Visi & Misi JDIH
                </h2>
                <p className="text-xl opacity-90">Arah dan tujuan pengembangan sistem informasi hukum</p>
              </div>
              
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 group">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl text-white">👁️</span>
                      </div>
                      <h3 className="text-3xl font-bold text-orange-700">VISI</h3>
                      <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <div className="bg-white/80 p-6 rounded-2xl">
                      <p className="text-lg text-gray-700 leading-relaxed text-center font-medium">
                        "Terwujudnya Jaringan Dokumentasi dan Informasi Hukum yang terintegrasi, 
                        mudah diakses, dan terpercaya untuk mendukung supremasi hukum di Indonesia"
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 group">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl text-white">🚀</span>
                      </div>
                      <h3 className="text-3xl font-bold text-amber-700">MISI</h3>
                      <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <div className="space-y-4">
                      {[
                        'Menyediakan akses informasi hukum yang mudah dan cepat',
                        'Meningkatkan kualitas pelayanan dokumentasi hukum',
                        'Mengintegrasikan sistem informasi hukum secara nasional',
                        'Mendukung transparansi dan akuntabilitas hukum',
                        'Mempercepat proses pembentukan peraturan'
                      ].map((misi, index) => (
                        <div key={index} className="flex items-start space-x-4 bg-white/80 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                            {index + 1}
                          </div>
                          <span className="text-gray-800 font-medium leading-relaxed">{misi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Services Section */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Layanan Utama JDIH</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-3xl border-2 border-orange-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-2xl text-white">{service.icon}</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Sistem JDIH</h3>
                  <p className="opacity-90">Jaringan Dokumentasi & Informasi Hukum</p>
                </div>
              </div>
              <p className="text-orange-100 leading-relaxed mb-6 max-w-md">
                Menyediakan akses mudah dan cepat terhadap seluruh produk hukum di Indonesia 
                untuk mendukung supremasi hukum dan good governance.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-xl">📧</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-xl">📞</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-xl">🌐</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Layanan</h4>
              <div className="space-y-2">
                {['Database Peraturan', 'Pencarian Dokumen', 'Monitoring Hukum', 'Download Center', 'API Service'].map((item) => (
                  <a key={item} href="#" className="block text-orange-100 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Informasi</h4>
              <div className="space-y-2">
                {['Tentang JDIH', 'Panduan', 'FAQ', 'Kontak', 'Bantuan'].map((item) => (
                  <a key={item} href="#" className="block text-orange-100 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-orange-100 mb-2">
              © 2024 Sistem JDIH Indonesia. Semua hak cipta dilindungi undang-undang.
            </p>
            <p className="text-sm text-orange-200">
              Dikelola oleh Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia
            </p>
          </div>
        </div>
      </footer>
            <img 
    src="/assets/heheh.png" 
    alt="Footer Universitas Jambi" 
    className="w-full object-cover" 
    />
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
          
      `}</style>
    </div>
  );
}