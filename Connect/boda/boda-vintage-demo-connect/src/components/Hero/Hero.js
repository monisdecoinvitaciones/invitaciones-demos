"use client";
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-clean" id="inicio">
      <div className="hero-background"></div>
      
      <div className="hero-ui">
        {/* Superior: Save the date */}
        <div className="hero-top">
          <span className="glass-tag">SAVE THE DATE</span>
        </div>

        {/* Inferior: Todo el bloque informativo agrupado para móvil */}
        <div className="hero-bottom-group">
          <div className="main-info-glass">
            <h1 className="names-title">Karina & Ulises</h1>
            <div className="hero-divider-minimal"></div>
            <p className="hero-date-text">24 . 07 . 2027</p>
          </div>
          
          <div className="hero-location-box">
            <p className="location-tag">GUADALAJARA, JALISCO</p>
          </div>
        </div>
      </div>

      <div className="minimal-scroll">
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
}