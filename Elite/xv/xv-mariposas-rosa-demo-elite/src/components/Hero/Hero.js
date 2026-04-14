import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Iniciamos la animación con un pequeño delay para que se note la entrada
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id='inicio' className={`hero-container ${isVisible ? 'animate-in' : ''}`}>
      {/* Fondo con la foto de la quinceañera */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      {/* Contenido Central: Nombre y Fecha */}
      <div className="hero-content">
        <span className="hero-subtitle">Mis XV Años</span>
        <h1 className="hero-title">Valentina</h1>
        <div className="hero-divider"></div>
        <p className="hero-date">25 . 10 . 2027</p>
      </div>

      {/* Indicador de Scroll: Fuera del contenido para evitar amontonamiento */}
      <div className="hero-scroll-indicator">
        <div className="mouse-wheel"></div>
      </div>
    </section>
  );
};

export default Hero;