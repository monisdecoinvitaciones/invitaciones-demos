import React, { useRef, useEffect, useState } from 'react';
import './FamilySection.css';

const FamilySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id='padres' ref={sectionRef} className={`family-creative-section ${isVisible ? 'is-active' : ''}`}>
      <div className="floral-background"></div>
      
      <div className="family-flex-container">
        
        {/* BLOQUE PADRES */}
        <div className="family-group-box parents-box">
          <div className="reveal-mask">
            <span className="small-tag">CON LA BENDICIÓN DE MIS PADRES</span>
          </div>
          <div className="names-stack">
            <h3 className="family-name-title">Sr. Carlos Mendoza</h3>
            <h3 className="family-name-title">Sra. Elena Ríos</h3>
          </div>
          <div className="decoration-element line-left"></div>
        </div>

        {/* ELEMENTO CENTRAL INTERACTIVO */}
        <div className="family-center-decor">
          <div className="circle-border">
            <img src="/mariposas/optimized/5.webp" className="floating-center-butterfly" alt="" />
          </div>
        </div>

        {/* BLOQUE PADRINOS */}
        <div className="family-group-box godparents-box">
          <div className="reveal-mask">
            <span className="small-tag">CON EL CARIÑO DE MIS PADRINOS</span>
          </div>
          <div className="names-stack">
            <h3 className="family-name-title">Sr. Roberto Gómez</h3>
            <h3 className="family-name-title">Sra. Patricia Luna</h3>
          </div>
          <div className="decoration-element line-right"></div>
        </div>

      </div>

      <div className="family-message">
        <p>Guiando mis pasos con amor y sabiduría</p>
      </div>
    </section>
  );
};

export default FamilySection;