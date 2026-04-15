"use client";
import React, { useEffect, useState, useRef } from 'react';
import './AvisoImportante.css';

const AvisoImportante = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`special-moment-section ${isVisible ? 'animate-in' : ''}`} ref={sectionRef}>
      {/* El polvo de estrellas del fondo */}
      <div className="star-dust"></div>

      {/* Tus iconos flotantes característicos */}
      <img src="/mariposas/optimized/5.webp" alt="mariposa" className="float-butterfly b1" />
      <img src="/mariposas/optimized/5.webp" alt="mariposa" className="float-butterfly b2" />
      <img src="/mariposas/optimized/2.webp" alt="flor" className="float-flower f1" />
      <img src="/mariposas/optimized/2.webp" alt="flor" className="float-flower f2" />

      <div className="special-moment-content">
        <div className="special-moment-wrapper">
          {/* Comillas con tu tipografía Mea Culpa */}
          
          
          <div className="special-moment-text">
            <h3 className="special-tag">¡PREPARA TU CÁMARA!</h3>
            <p>
              A las <span className="highlight-time">10:00 PM</span> ocurrirá un 
              <span className="highlight"> momento mágico</span> que quiero compartir contigo. 
            </p>
            <div className="special-ornament"></div>
            <p className="special-footer">¡No te lo puedes perder!</p>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default AvisoImportante;