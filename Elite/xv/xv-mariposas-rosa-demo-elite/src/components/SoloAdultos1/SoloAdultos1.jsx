import React, { useEffect, useRef, useState } from 'react';
import './SoloAdultos1.css';

export default function SoloAdultos() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="adultos-seccion" ref={sectionRef}>
      <div className={`adultos-frame ${isVisible ? 'visible' : ''}`}>
        <span className="adultos-icon">— Nota Importante —</span>
        
        <h2 className="adultos-titulo-fino">
          UNA CELEBRACIÓN <br /> DE ADULTOS
        </h2>
        
        <div className="adultos-linea"></div>

        <p className="adultos-texto-editorial">
          Amamos a los pequeños, pero para esta ocasión hemos decidido celebrar
          en un ambiente exclusivo para adultos.
        </p>

        <p className="adultos-texto-editorial" style={{ marginTop: '15px', fontSize: '1rem', fontStyle: 'italic' }}>
          Agradecemos profundamente su comprensión y el esfuerzo por acompañarnos.
        </p>
      </div>
    </section>
  );
}