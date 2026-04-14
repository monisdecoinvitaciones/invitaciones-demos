'use client';
import React, { useState, useEffect, useRef } from 'react';
import './DressCode.css';

const DressCode = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [colorsVisible, setColorsVisible] = useState(false);
  const sectionRef = useRef(null);
  const colorsRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setSectionVisible(true);
    }, observerOptions);

    const colorsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setColorsVisible(true);
    }, { threshold: 0.2 });

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (colorsRef.current) colorsObserver.observe(colorsRef.current);

    return () => {
      sectionObserver.disconnect();
      colorsObserver.disconnect();
    };
  }, []);

  // Tonos prohibidos basados en tu paleta de rosas y rojo
  const forbiddenPalette = [
    { id: 'f1', hex: '#FFFFFF', name: 'Blanco' },
    { id: 'f2', hex: '#F8D8DE', name: 'Rosa Palo' },
    { id: 'f3', hex: '#E47990', name: 'Rosa Pastel' },
    { id: 'f4', hex: '#B8445E', name: 'Rosa Fuerte' },
    { id: 'f5', hex: '#bc0000', name: 'Rojo' }, 
  ];

  return (
    <section className="dress-code-section" ref={sectionRef} id='vestimenta'>
      
      
      <div className={`dress-code-container ${sectionVisible ? 'reveal-content' : ''}`}>
        <div className="dress-icon-wrapper">
          <img src="/iconosRosaPalo/11.png" alt="Dress Code Icon" className="dress-icon" />
        </div>
        
        <h2 className="dress-title">Código de vestimenta</h2>
        <h3 className="dress-type">GALA / ETIQUETA</h3>

        <div className="dress-description">
          <p>La elegancia será nuestra mejor compañía. Nos encantaría verte lucir tu mejor estilo de gala para celebrar juntos esta noche mágica.</p>
        </div>

        <div className="dress-colors-wrapper" ref={colorsRef}>
          <div className="palette-group reserved">
            <p className="colors-subtitle">Tonos Reservados</p>
            <div className="forbidden-grid">
              {forbiddenPalette.map((color, index) => (
                <div key={color.id} className="color-item">
                  <div 
                    className={`color-circle ${colorsVisible ? 'reveal-circle' : ''}`}
                    style={{ 
                      backgroundColor: color.hex, 
                      transitionDelay: `${index * 0.15}s` 
                    }}
                  >
                    <span className="x-mark">✕</span>
                  </div>
                  <span className="color-name">{color.name}</span>
                </div>
              ))}
            </div>
            <p className="dress-note">
              Con el fin de que la festejada luzca de manera especial, agradecemos tu gentileza al evitar estos colores en tu vestimenta.
            </p>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default DressCode;