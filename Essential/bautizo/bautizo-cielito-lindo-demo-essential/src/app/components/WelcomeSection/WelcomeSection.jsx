'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import './WelcomeSection.css';

const ArchedTitle = ({ text }) => (
  <div className="arched-title-container">
    <svg viewBox="0 0 600 90" className="arched-svg">
      <path id="curve-welcome" d="M 50,80 Q 300,30 550,80" fill="transparent" />
      <text className="arched-text">
        <textPath xlinkHref="#curve-welcome" startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  </div>
);

const WelcomeSection = () => {
  const [ref, isVisible] = useReveal();

  return (
    <section className="welcome-section-bg">
      <div className="welcome-main-container">
        <div 
          ref={ref}
          className={`welcome-group ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
          <ArchedTitle text="ESTÁN INVITADOS" />

          <div className="welcome-card-elegant">
            <div className="talavera-decor-top">❀</div>
            
            <div className="card-content">
              <h3 className="welcome-subtitle">Con la bendición de Dios</h3>
              <p className="welcome-main-text">Acompañenos a celebrar el</p>
              <span className="text-highlight">Santo Bautizo</span>
              <p className="welcome-main-text">de nuestra pequeña</p>
              <h2 className="baby-name-card">Marian Andrea</h2>
            </div>

            <div className="talavera-pattern-bottom"></div>
          </div>

          <div className="welcome-footer-decor">
            <div className="ornament-line"></div>
            <span className="ornament-diamond">✦</span>
            <div className="ornament-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;