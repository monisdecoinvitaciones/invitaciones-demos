'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Countdown.css';

const Countdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Configurado para el 16 de mayo de 2026 a la 1:00 PM (13:00:00)
  const targetDate = new Date('2027-08-22T13:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Estado para saber si la fecha ya pasó
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    // Observer para la animación
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Si la distancia es negativa, la convertimos a positiva para el cálculo
      // pero activamos el flag de "isPast"
      const absDistance = Math.abs(distance);
      setIsPast(distance < 0);

      setTimeLeft({
        days: Math.floor(absDistance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((absDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((absDistance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((absDistance % (1000 * 60)) / 1000),
      });
      
      // No limpiamos el intervalo para que siga contando después de llegar a cero
    }, 1000);

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [targetDate]);

  return (
    <section className={`countdown-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="countdown-bg-wrapper">
        <div className="countdown-overlay"></div>
      </div>

      {/* --- DECORACIONES DE PAPEL PICADO --- */}
      <div className="decor-papel-picado decor-top-left">
        <img src="/fotos/papel-picado.png" alt="Decoración Papel Picado Superior" />
      </div>

      <div className="decor-papel-picado decor-bottom-right">
        <img src="/fotos/papel-picado.png" alt="Decoración Papel Picado Inferior" />
      </div>
      {/* ------------------------------------- */}

      <div className="countdown-content">
        {/* El título cambia dinámicamente según la fecha */}
        <h3 className="countdown-subtitle fuente-serif">
          {isPast ? 'HAN PASADO' : 'SOLO FALTAN'}
        </h3>
        
        <div className="countdown-grid">
          <div className="time-block anim-1">
            <span className="time-number">{timeLeft.days}</span>
            <span className="time-label">Días</span>
          </div>
          <div className="time-divider"></div>
          <div className="time-block anim-2">
            <span className="time-number">{timeLeft.hours}</span>
            <span className="time-label">Horas</span>
          </div>
          <div className="time-divider"></div>
          <div className="time-block anim-3">
            <span className="time-number">{timeLeft.minutes}</span>
            <span className="time-label">Min</span>
          </div>
          <div className="time-divider"></div>
          <div className="time-block anim-4">
            <span className="time-number">{timeLeft.seconds}</span>
            <span className="time-label">Seg</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;