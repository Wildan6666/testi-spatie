import React, { useState } from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { mainNews, popularNews } from './dummy';
import '../../css/berita.css';
import { Link } from '@inertiajs/react';


const NewsWebsite = () => {
  const [activeTab, setActiveTab] = useState('beranda');

  const NavigationBar = () => (
  <header className="navbar">
        <div className="navbar-content">
          <div className="logo-container">
            <img 
              src="https://jdih.perpusnas.go.id/public/style/img/LOGO-JDIHN-PHN.png" 
              alt="Logo jdih" 
              className="logo"
            />
<Link href="/">
  <img 
    src="https://th.bing.com/th/id/R.86dce44d0b6ed1a54adf1f31f0670e91?rik=2DeJsiiVWkapnA&riu=http%3a%2f%2fagribisnis.unja.ac.id%2fwp-content%2fuploads%2f2019%2f11%2fcropped-Logo-UNJA.png&ehk=DYTHw8EoXNZdJLcttayfQVg0mX13Cu37ohMIJRTg8gw%3d&risl=&pid=ImgRaw&r=0" 
    alt="Logo unja" 
    className="logo cursor-pointer"
/>
</Link>
          </div>

          {/* Menu */}
          <nav className="navigation">
            <a href="/dashboard" className="nav-link">Beranda</a>
            <a href="#" className="nav-link">Tentang Kami</a>
            <a href="/dokumen" className="nav-link">Dokumen Hukum</a>
        <Link
          href="/logout"
          method="post"
          as="button"
          className="login-button"
        >
          <span>Logout</span>
        </Link>
        
              
          </nav>
        </div>
  </header>
  );

  const NewsCard = ({ news, isSmall = false }) => (
    <div className={`card ${isSmall ? 'sidebar-item' : ''}`}>
      <img 
        src={news.image} 
        alt={news.title}
        className={`card-image ${isSmall ? 'card-image-small' : 'card-image-medium'}`}
      />
      <div className="card-content">
        <div className="card-meta">
          <Calendar size={12} />
          <span>{news.date}</span>
          {news.category && (
            <>
              <span className="card-meta-separator">•</span>
              <span className="card-category">{news.category}</span>
            </>
          )}
        </div>
        <h3 className={`card-title ${isSmall ? 'card-title-small' : 'card-title-medium'}`}>
          {news.title}
        </h3>
        <div className="card-footer">
          <User size={12} />
          <span>Admin</span>
          <span className="card-read-more">
            Baca Selengkapnya →
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      {/* Hero Section with gradient background */}
      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hero-grid">
{/* Main Article */}
<div className="main-article-scroll">
  <div className="main-article-header">
    <img 
      src={mainNews.image} 
      alt={mainNews.title}
      className="card-image card-image-large"
    />
    <div className="card-content card-content-large">
      <h1 className="card-title card-title-large">
        {mainNews.title}
      </h1>
      <div className="main-article-meta">
        <User size={16} />
        <span>{mainNews.author}</span>
        <Calendar size={16} />
        <span>{mainNews.date}</span>
      </div>
      <div className="main-article-body">
        {mainNews.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  </div>
</div>

            {/* Sidebar */}
            <div>
              <div className="sidebar">
                <div className="sidebar-header">
                  <h2 className="sidebar-title">Berita Terpopuler</h2>
                  <ChevronRight size={20} style={{ color: '#9ca3af' }} />
                </div>
                <div className="sidebar-content">
                  {popularNews.map((news, index) => (
                    <NewsCard key={news.id} news={news} isSmall={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="footer">
        <img 
          src="/assets/heheh.png" 
          alt="Footer Universitas Jambi" 
          className="footer-image" 
        />

        {/* Copyright + Social Media */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            <span className="footer-brand">UPATIK</span> © 2025 - All rights reserved
          </p>
          <div className="footer-social">
            <a href="#" className="youtube"><Youtube size={24} /></a>
            <a href="#" className="facebook"><Facebook size={24} /></a>
            <a href="#" className="twitter"><Twitter size={24} /></a>
            <a href="#" className="instagram"><Instagram size={24} /></a>
            <a href="#" className="linkedin"><Linkedin size={24} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsWebsite;