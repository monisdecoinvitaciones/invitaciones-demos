import React from 'react';
import './HeroBautizo.css';

export default function HeroBautizo() {
  const datos = {
    subtitulo: "BENDICIÓN DE AMOR",
    nombre: "Marian Andrea",
    detalle: "MI BAUTIZO",
    fecha: "22 / 08 / 27"
  };

  return (
    <section className="hero-premium" id='inicio'>
      {/* Contenedor de imagen con máscara de brillo */}
      <div className="hero-visual">
        <div className="hero-foto-fondo"></div>
        <div className="hero-vignette"></div>
      </div>

      {/* Contenido Minimalista */}
      <div className="hero-overlay-content">
        <header className="hero-top-info">
          <span className="hero-line"></span>
          <p className="hero-mini-tag">{datos.subtitulo}</p>
          <span className="hero-line"></span>
        </header>

        <div className="hero-main-title">
          <h1 className="nombre-script">{datos.nombre}</h1>
          <h2 className="motivo-bautizo">{datos.detalle}</h2>
        </div>

        <footer className="hero-bottom-info">
          <div className="hero-date-box">
             <span className="date-number">{datos.fecha}</span>
          </div>
        </footer>
      </div>

      <div className="mouse-scroll">
        <div className="wheel"></div>
      </div>
    </section>
  );
}