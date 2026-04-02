"use client";
import { useState } from "react";
import { useAnimations } from "@/hooks/useAnimations"; 
import "./Galeria.css";

export default function Galeria() {
  useAnimations();
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  const fotos = [
    { id: 1, src: "/Boda4/optimized/boda2.webp", size: "lg" },
    { id: 2, src: "/Boda4/optimized/boda3.webp", size: "sm" },
    { id: 3, src: "/Boda4/optimized/boda4.webp", size: "md" },
    { id: 4, src: "/Boda4/optimized/boda5.webp", size: "md" },
    { id: 5, src: "/Boda4/optimized/boda6.webp", size: "lg" },
    { id: 6, src: "/Boda4/optimized/boda7.webp", size: "sm" },
    { id: 7, src: "/Boda4/optimized/boda8.webp", size: "md" },
  ];

  return (
    <section className="galeria-section" id="galeria">
      <div className="galeria-header">
        <h3 className="galeria-subtitle">NUESTROS MOMENTOS</h3>
        <h2 className="galeria-title">Galería de Recuerdos</h2>
      </div>

      <div className="galeria-container">
        {fotos.map((foto, index) => (
          <div 
            key={foto.id} 
            className={`galeria-item ${foto.size} animar`}
            style={{ '--delay': `${index * 0.1}s` }}
            onClick={() => setFotoSeleccionada(foto.src)}
          >
            <div className="galeria-image-wrapper">
              <img src={foto.src} alt={`Boda ${foto.id}`} loading="lazy" />
              <div className="galeria-overlay"></div>
            </div>
          </div>
        ))}
      </div>

      {/* VISTA DE ZOOM (LIGHTBOX) */}
      {fotoSeleccionada && (
        <div className="galeria-lightbox" onClick={() => setFotoSeleccionada(null)}>
          <div className="lightbox-close">×</div>
          <img src={fotoSeleccionada} alt="Zoom" className="lightbox-img" />
          <div className="lightbox-backdrop"></div>
        </div>
      )}
    </section>
  );
}