import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = () => {
  const targetDate = new Date('2027-10-25T19:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="elegant-countdown" id='fecha'>
      {/* Decoración sutil de fondo */}
      <div className="elegant-overlay"></div>
      
      <div className="elegant-container">
        <header className="elegant-header">
          <span className="elegant-subtitle">NUESTRA CITA</span>
          <div className="elegant-line"></div>
          <h2 className="elegant-title">La cuenta regresiva</h2>
        </header>

        <div className="elegant-grid">
          <div className="elegant-item">
            <span className="elegant-number">{timeLeft.days}</span>
            <span className="elegant-label">Días</span>
          </div>
          <div className="elegant-divider"></div>
          <div className="elegant-item">
            <span className="elegant-number">{timeLeft.hours}</span>
            <span className="elegant-label">Horas</span>
          </div>
          <div className="elegant-divider"></div>
          <div className="elegant-item">
            <span className="elegant-number">{timeLeft.minutes}</span>
            <span className="elegant-label">Min.</span>
          </div>
          <div className="elegant-divider"></div>
          <div className="elegant-item">
            <span className="elegant-number seconds-glow">{timeLeft.seconds}</span>
            <span className="elegant-label">Seg.</span>
          </div>
        </div>

        <footer className="elegant-footer">
        
          <p className="full-date-text">LUNES 25 DE OCTUBRE DE 2027</p>
          
        </footer>
      </div>
    </section>
  );
};

export default Countdown;