"use client";
import React, { useState } from 'react';
import './SeccionGaleriaInteractiva.css';

const SeccionGaleriaInteractiva = () => {
  // Inicializamos con el primer panel expandido
  const [activeIndex, setActiveIndex] = useState(0);

  const fotos = [
    "/boda5/optimized/boda1.webp",
    "/boda5/optimized/boda2.webp",
    "/boda5/optimized/boda3.webp",
    "/boda5/optimized/boda4.webp",
    "/boda5/optimized/boda5.webp",
    "/boda5/optimized/boda6.webp",
  ];

  return (
    <section className="contenedor-interactivo">
      <div className="galeria-acordeon">
        {fotos.map((src, index) => (
          <div 
            key={index}
            className={`panel-foto ${activeIndex === index ? 'activo' : ''}`}
            // Soporta hover en PC y click/tap en móvil
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <img 
              src={src} 
              alt={`Galería ${index + 1}`} 
              className="imagen-panel" 
            />
            {/* El texto o detalle solo aparece en el panel expandido */}
            <div className={`info-minimal ${activeIndex === index ? 'visible' : ''}`}>
              <span>0{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeccionGaleriaInteractiva;