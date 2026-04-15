"use client";
import { useEffect, useRef } from 'react';
import './Ubicaciones.css';

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default function Ubicaciones() {
  const ubicacionesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = ubicacionesRef.current.querySelectorAll('.location-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="ubicaciones-section" id="datos" ref={ubicacionesRef}>
      <div className="ubicaciones-container">
        
        <div className="section-header">
          <span className="section-subtitle">EL GRAN DÍA</span>
          <h2 className="section-title">Ubicaciones</h2>
          <div className="section-divider"></div>
        </div>

        <div className="locations-grid">
          
          {/* TARJETA 1: CEREMONIA */}
          <div className="location-card ceremonia">
            <div className="card-glass-effect"></div>
            <div className="card-shine"></div>
            
            <div className="card-content">
              <div className="icon-wrapper">
                <div className="icon-box">
                   <img src="/iconosBlancos/20.png" alt="Iglesia" className="premium-icon" />
                </div>
              </div>

              <h3 className="card-title">La Ceremonia</h3>
              
              <div className="detail-row">
                <ClockIcon />
                <p>4:30 PM — Sábado</p>
              </div>
              
              <div className="detail-row address">
                <MapPinIcon />
                <p>
                  <strong>Templo de la Expiación</strong><br />
                  C. López Cotilla 935, Guadalajara.
                </p>
              </div>

              <a href="https://www.google.com.mx/maps" className="btn-premium">VER UBICACIÓN</a>
            </div>
          </div>

          {/* TARJETA 2: RECEPCIÓN */}
          <div className="location-card recepcion">
            <div className="card-glass-effect"></div>
            <div className="card-shine"></div>
            
            <div className="card-content">
              <div className="icon-wrapper">
                <div className="icon-box">
                  <img src="/iconosBlancos/30.png" alt="Fiesta" className="premium-icon" />
                </div>
              </div>

              <h3 className="card-title">La Fiesta</h3>
              
              <div className="detail-row">
                <ClockIcon />
                <p>7:00 PM — Cóctel de Bienvenida</p>
              </div>
              
              <div className="detail-row address">
                <MapPinIcon />
                <p>
                  <strong>Hacienda Loma de la Cruz</strong><br />
                  Km. 15 Carr. a Zapotlanejo, GDL.
                </p>
              </div>

              <a href="https://www.google.com.mx/maps" className="btn-premium">CÓMO LLEGAR</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}