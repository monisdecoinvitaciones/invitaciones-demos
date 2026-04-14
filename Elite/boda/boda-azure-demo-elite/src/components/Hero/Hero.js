import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id='inicio' className={`hero-container ${isVisible ? 'animate-in' : ''}`}>
      {/* Fondo con la foto principal */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      {/* Contenido Editorial */}
      <div className="hero-content">
        <div className="hero-text-box">
          <span className="hero-subtitle">NUESTRA BODA</span>
          <h1 className="hero-title">Valentina & Julián</h1>
          
          <div className="hero-decoration">
            <span className="line"></span>
            <div className="hero-diamond"></div>
            <span className="line"></span>
          </div>

          <p className="hero-date">24 . 07 . 2027</p>
          <p className="hero-location">VALLE DE BRAVO, MÉXICO</p>
        </div>
      </div>

      {/* Indicador de Scroll Minimalista */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">DESLIZA</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;