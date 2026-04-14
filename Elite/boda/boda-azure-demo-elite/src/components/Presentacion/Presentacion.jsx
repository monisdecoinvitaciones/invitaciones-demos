"use client";
import { useEffect, useRef, useState } from 'react';
import './Presentacion.css';

export default function Presentacion() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`artistic-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="artistic-container">
        
        {/* Lado Ella */}
        <div className="art-persona ella">
          <div className="blob-wrapper">
             <div className="blob-shape bg-sage"></div>
             <img src="/boda5/optimized/novia.webp" alt="Valentina" className="art-photo" />
          </div>
          <div className="art-info">
            <span className="art-role">LA NOVIA</span>
            <h2 className="art-name">Valentina</h2>
          </div>
        </div>

        {/* Nexo Central - Escritorio */}
        <div className="art-center-desktop">
          <div className="line-top"></div>
          <span className="ampersand">&</span>
          <div className="line-bottom"></div>
        </div>

        {/* Lado Él */}
        <div className="art-persona el">
          <div className="blob-wrapper">
             <div className="blob-shape bg-blue"></div>
             <img src="/boda5/optimized/novio.webp" alt="Julián" className="art-photo" />
          </div>
          <div className="art-info">
            <span className="art-role">EL NOVIO</span>
            <h2 className="art-name">Julián</h2>
          </div>
        </div>

      </div>
    </section>
  );
}