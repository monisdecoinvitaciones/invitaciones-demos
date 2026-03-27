'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import './FamilySection.css';

// Sub-componente para el texto en arco
const ArchedTitle = ({ text, id }) => (
  <div className="arched-title-container">
    {/* Aumentamos el viewBox a 600 para que el texto largo no choque con los bordes */}
    <svg viewBox="0 0 600 120" className="arched-svg">
      {/* El path ahora está centrado en un lienzo de 600 */}
      <path id={id} d="M 50,100 Q 300,10 550,100" fill="transparent" />
      <text className="arched-text">
        <textPath xlinkHref={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  </div>
);

const FamilySection = () => {
  const [ref1, isVisible1] = useReveal();
  const [ref2, isVisible2] = useReveal();

  return (
    <section className="family-section-bg">
      <div className="family-container">
        
        {/* GRUPO PADRES */}
        <div 
          ref={ref1}
          className={`family-group ${isVisible1 ? 'reveal-visible' : 'reveal-hidden'}`}
        >
          {/* Título Arqueado */}
          <ArchedTitle text="Mis Padres" id="curve-padres" />

          <div className="family-card-elegant">
            <div className="talavera-decor-top">❀</div>
            <div className="card-content">
              <p className="name-text">Guadalupe Sandoval Aguilar</p>
              <div className="name-divider"></div>
              <p className="name-text">Antonio Ruiz Vázquez</p>
            </div>
            <div className="talavera-pattern-bottom"></div>
          </div>
        </div>

        {/* SEPARADOR CENTRAL */}
        <div className="family-center-decor">
          <div className="ornament-line"></div>
          <span className="ornament-diamond">✦</span>
          <div className="ornament-line"></div>
        </div>

        {/* GRUPO PADRINOS */}
        <div 
          ref={ref2}
          className={`family-group ${isVisible2 ? 'reveal-visible' : 'reveal-hidden'}`}
        >
          {/* Título Arqueado */}
          <ArchedTitle text="Mis Padrinos" id="curve-padrinos" />

          <div className="family-card-elegant">
            <div className="talavera-decor-top">❀</div>
            <div className="card-content">
              <p className="name-text">Griselda Adriana Ruiz Vázquez</p>
              <div className="name-divider"></div>
              <p className="name-text">José Enrique Galindo Ponce</p>
            </div>
            <div className="talavera-pattern-bottom"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FamilySection;