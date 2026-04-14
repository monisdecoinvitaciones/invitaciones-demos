"use client";
import React, { useEffect, useRef, useState } from 'react';
import './Padres.css';

const Padres = () => {
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
    <section 
      className={`family-section ${isVisible ? 'is-visible' : ''}`} 
      id="padres"
      ref={sectionRef}
    >
      <div className="family-container">
       

        <div className="family-grid">
          {/* Padres de la Novia */}
          <div className="family-card" tabIndex="0">
            <div className="card-inner">
              <div className="card-front">
                <span className="parent-label">PADRES DE LA NOVIA</span>
                <h3 className="parent-names">Roberto & Elena</h3>
                <p className="interact-hint">Toca para leer más</p>
              </div>
              <div className="card-back">
                <p className="thank-you-msg">
                  "Gracias por guiarnos con amor y ser nuestro ejemplo de vida."
                </p>
              </div>
            </div>
          </div>

          {/* Padres del Novio */}
          <div className="family-card" tabIndex="0">
            <div className="card-inner">
              <div className="card-front">
                <span className="parent-label">PADRES DEL NOVIO</span>
                <h3 className="parent-names">Ricardo & Patricia</h3>
                <p className="interact-hint">Toca para leer más</p>
              </div>
              <div className="card-back">
                <p className="thank-you-msg">
                  "Su amor incondicional es el cimiento de nuestra nueva familia."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Padres;