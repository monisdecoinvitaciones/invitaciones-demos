'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Galeria.css';

const Galeria = () => {
  const [modalImagen, setModalImagen] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const fotos = [
    { id: 1, src: '/bautizo/optimized/4.webp', clase: 'grande' },
    { id: 2, src: '/bautizo/optimized/5.webp', clase: 'vertical' },
    { id: 3, src: '/bautizo/optimized/6.webp', clase: 'vertical' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className={`seccion-galeria ${isVisible ? 'reveal-active' : ''}`} 
      ref={sectionRef}
    >
      {/* ESTAMPADO DE PAPEL PICADO */}
      <div className="galeria-papel-picado"></div>

      <div className="galeria-header">
        <span className="galeria-subtitle">Momentos</span>
        <h2 className="titulo-galeria">Galería</h2>
      </div>

      <div className="contenedor-collage">
        {fotos.map((foto, index) => (
          <div 
            key={foto.id} 
            className={`foto-item ${foto.clase} anim-item`}
            style={{ transitionDelay: `${(index + 1) * 0.2}s` }}
            onClick={() => setModalImagen(foto.src)}
          >
            <div className="overlay-zoom">
              <span className="zoom-icon">VER</span>
            </div>
            <img src={foto.src} alt={`Galería ${foto.id}`} />
          </div>
        ))}
      </div>

      {/* MODAL / LIGHTBOX */}
      {modalImagen && (
        <div className="modal-galeria" onClick={() => setModalImagen(null)}>
          <button className="cerrar-modal">&times;</button>
          <div className="modal-contenido">
            <img src={modalImagen} alt="Zoom" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;