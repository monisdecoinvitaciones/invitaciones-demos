"use client";
import React, { useEffect, useState, useRef } from 'react';
import './Despedida.css';

export default function Despedida() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 } // Se activa cuando el 30% es visible
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`elite-despedida-section ${isVisible ? 'elite-animate-in' : ''}`}
    >
      {/* Fondo de Estrellas Sutil (opcional, sobre la foto) */}
      <div className="elite-despedida-stars"></div>

      <div className="elite-despedida-container">
        
        <blockquote className="elite-despedida-frase">
          ¡No <span className="mea-highlight">faltes</span>!
        </blockquote>

        <p className="elite-despedida-subtext">
          Tu presencia es mi mejor regalo <br />
          para esta noche mágica.
        </p>

        <div className="elite-despedida-divider">
          <span className="mea-highlight">Valentina</span>
        </div>
      </div>
    </section>
  );
}