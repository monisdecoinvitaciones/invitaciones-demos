'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import './QuoteSection.css';

const QuoteSection = () => {
  // ref e isVisible detectan cuando el usuario llega al final de la página
  const [ref, isVisible] = useReveal();

  return (
    <section className="closing-master-section">
      {/* Añadimos la clase reveal-visible al contenedor padre para activar los bordes */}
      <div className={`quote-section-invimon ${isVisible ? 'reveal-visible' : ''}`}>
        
        {/* El div para bordes horizontales */}
        <div className="quote-frame-border"></div>

        <div 
          ref={ref} 
          className={`quote-container-invimon ${isVisible ? 'reveal-visible' : ''}`}
        >
          
          <p className="quote-text-main-invimon">
            Tu presencia hará este día aún más especial.
          </p>

          <div className="quote-divider-invimon"></div>

          <span className="quote-author-invimon"> ¡Nos vemos pronto!</span>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;