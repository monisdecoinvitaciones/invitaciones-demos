"use client";
import { useEffect, useRef } from 'react';
import './Presentacion.css';

export default function Presentacion() {
  const sectionRef = useRef(null);

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

    const cards = sectionRef.current.querySelectorAll('.novio-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="nosotros-section" id="nosotros" ref={sectionRef}>
      <div className="nosotros-container">
        
        {/* Bloque de Ella */}
        <div className="novio-card ella">
          <div className="foto-wrapper">
            {/* Capa que hace el efecto cortina */}
            <div className="reveal-curtain"></div>
            <img src="/Boda4/optimized/novia.webp" alt="La Novia" className="foto-content" />
          </div>
          <div className="info-glass">
            <span className="rol">LA NOVIA</span>
            <h2 className="nombre-script">Karina</h2>
            <p className="descripcion">
              "Encontré en ti no solo al amor de mi vida, sino al compañero 
              con quien cada pequeño detalle se vuelve una gran aventura."
            </p>
          </div>
        </div>

        {/* Separador Central */}
        <div className="middle-divider">
          <div className="vertical-line"></div>
          <span className="ampersand-center">&</span>
          <div className="vertical-line"></div>
        </div>

        {/* Bloque de Él */}
        <div className="novio-card el">
          <div className="foto-wrapper">
            <div className="reveal-curtain"></div>
            <img src="/Boda4/optimized/novio.webp" alt="El Novio" className="foto-content" />
          </div>
          <div className="info-glass">
            <span className="rol">EL NOVIO</span>
            <h2 className="nombre-script">Ulises</h2>
            <p className="descripcion">
              "Prometo caminar a tu lado siempre, cuidando nuestro amor 
              con la misma entrega con la que hoy te entrego mi corazón."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}