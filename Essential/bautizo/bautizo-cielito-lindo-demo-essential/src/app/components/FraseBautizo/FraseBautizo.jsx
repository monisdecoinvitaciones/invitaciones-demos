'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import './FraseBautizo.css';

const FraseBautizo = () => {
  const [ref, isVisible] = useReveal();

  return (
    <section className="frase-bautizo-elegant-section">
      <div className="talavera-overlay-bg"></div>

      <div 
        ref={ref} 
        className={`frase-elegant-container ${isVisible ? 'frase-visible' : 'frase-hidden'}`}
      >
        <div className="adorno-superior-bautizo">
          <p className='text-white corazon'>❤</p>
        </div>
        
        {/* Envolvemos el texto en un contenedor para el efecto de revelado */}
        <div className="reveal-text-wrapper">
          <p className="texto-poetico-cursivo fuente-script">
            "Señor, hoy me presentan ante ti para ser bañada con la gracia de tu amor, 
            toma mi corazón y mantenlo junto a ti"
          </p>
        </div>
      </div>
    </section>
  );
};

export default FraseBautizo;