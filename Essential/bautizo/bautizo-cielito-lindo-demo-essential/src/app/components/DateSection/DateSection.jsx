'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import './DateSection.css';

const DateSection = () => {
  const [ref, isVisible] = useReveal();

  return (
    <section className="date-section">
      <div className="date-watermark">2027</div>

      <div 
        ref={ref} 
        className={`date-container ${isVisible ? 'date-visible' : 'date-hidden'}`}
      >
        <div className="date-frame">
          <span className="save-the-date">Reserva la fecha</span>
          
          <div className="date-flex">
            <span className="date-month">Agosto</span>
          </div>

          <h2 className="date-day-number">22</h2>

          <div className="date-year">2027</div>
          
          <p className="date-day-name">Domingo</p>
        </div>
      </div>
    </section>
  );
};

export default DateSection;