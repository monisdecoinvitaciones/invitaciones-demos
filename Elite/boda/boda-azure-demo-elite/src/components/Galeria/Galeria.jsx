"use client";
import React, { useState, useEffect } from 'react';
import './Galeria.css';

const Galeria = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedImg]);

  const fotos = [
    { id: 7, url: "/boda5/optimized/boda7.webp", size: "large" },
    { id: 9, url: "/boda5/optimized/boda9.webp", size: "medium" },
    { id: 10, url: "/boda5/optimized/boda10.webp", size: "small" },
    { id: 11, url: "/boda5/optimized/boda11.webp", size: "medium" },
    { id: 12, url: "/boda5/optimized/boda12.webp", size: "large" },
    { id: 13, url: "/boda5/optimized/boda13.webp", size: "small" },
  ];

  return (
    <section className="galeria-section" id="galeria">
      <div className="galeria-container">
        <div className="galeria-header">
          <span className="galeria-subtitle">Nuestros Momentos</span>
          <h2 className="galeria-title">Galería</h2>
          <div className="galeria-divider"></div>
        </div>

        <div className="galeria-grid">
          {fotos.map((foto) => (
            <div 
              key={foto.id} 
              className={`galeria-item ${foto.size}`}
              onClick={() => setSelectedImg(foto.url)}
            >
              <img 
                src={foto.url} 
                alt={`Momento Boda ${foto.id}`} 
                loading="lazy" 
              />
              <div className="galeria-overlay">
                <span>Ver más</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox - Sin bordes blancos */}
      {selectedImg && (
        <div className="galeria-modal" onClick={() => setSelectedImg(null)}>
          <span className="modal-close">&times;</span>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImg} 
              className="modal-content" 
              alt="Vista ampliada" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;