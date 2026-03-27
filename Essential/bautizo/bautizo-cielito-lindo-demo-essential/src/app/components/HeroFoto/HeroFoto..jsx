'use client';
import React, { useEffect, useState, useRef } from 'react';
import './HeroFoto.css';

const HeroFoto = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 } // Se activa antes para que no se vea el "salto"
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = (src) => setSelectedImg(src);
  const closeModal = () => setSelectedImg(null);

  return (
    <section className={`hero-photo-section ${isVisible ? 'is-revealed' : 'is-hidden'}`} ref={sectionRef}>
      <div className="photo-guirnalda-full"></div>

      <div className="photos-dual-container">
        
        {/* FOTO 1 - PRINCIPAL */}
        <div 
          className="photo-frame-wrapper main-photo anim-delay-1" 
          onClick={() => openModal("/bautizo/optimized/2.webp")}
        >
          <div className="photo-arch-frame">
            <div className="arch-border-line-gold"></div>
            <img src="/bautizo/optimized/2.webp" alt="Festejada 1" className="main-hero-img" />
          </div>
        </div>

        {/* FOTO 2 - SECUNDARIA */}
        <div 
          className="photo-frame-wrapper secondary-photo anim-delay-2" 
          onClick={() => openModal("/bautizo/optimized/3.webp")}
        >
          <div className="photo-arch-frame">
            <div className="arch-border-line-gold"></div>
            <img src="/bautizo/optimized/3.webp" alt="Festejada 2" className="main-hero-img" />
          </div>
        </div>
      </div>

      <div className="photo-caption anim-delay-3">
        <span className="caption-divider"></span>
        <p className="caption-text">Nuestra pequeña bendición</p>
      </div>

      {/* MODAL LIGHTBOX */}
      {selectedImg && (
        <div className="photo-modal-overlay" onClick={closeModal}>
          <div className="modal-content-wrapper">
            <span className="close-modal-btn">&times;</span>
            <img src={selectedImg} alt="Full view" className="full-res-img" />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroFoto;