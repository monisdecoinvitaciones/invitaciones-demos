"use client";
import { useState, useEffect } from 'react';
import './Countdown.css';

export default function Countdown() {
  // Fecha objetivo de la imagen de referencia
  const targetDate = new Date("2027-07-24T16:30:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Función para calcular el tiempo restante
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        return null;
      } else {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
      }
    };

    // Inicializamos
    setTimeLeft(calculateTimeLeft());

    // Actualizamos cada segundo
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      if (!remaining) {
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null; // O mostrar mensaje si la fecha pasó

  return (
    <section className="countdown-elegant">
      {/* CAPA DE FONDO CON IMAGEN Y DEGRADADO */}
      <div className="background-overlay">
        <div className="hero-background-image"></div>
        <div className="gradient-over"></div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="countdown-content-container">
        
        {/* Encabezado con Fecha */}
        <h3 className="elegant-date-header">24 DE JULIO DEL 2027</h3>
        
        {/* Divisor Superior Fino */}
        <div className="elegant-divider divider-top"></div>

        {/* El Contador Grid */}
        <div className="countdown-timer-grid">
          
          <div className="timer-item">
            <span className="timer-number">{timeLeft.days}</span>
            <span className="timer-label">DÍA(S)</span>
          </div>
          
          <div className="timer-item">
            <span className="timer-number">{timeLeft.hours}</span>
            <span className="timer-label">HORA(S)</span>
          </div>

          <div className="timer-item">
            <span className="timer-number">{timeLeft.minutes}</span>
            <span className="timer-label">MINUTO(S)</span>
          </div>

          <div className="timer-item">
            <span className="timer-number seconds-number">{timeLeft.seconds}</span>
            <span className="timer-label">SEGUNDO(S)</span>
          </div>

        </div>

        {/* Divisor Inferior Fino (Símbolo de elegancia simétrica) */}
        <div className="elegant-divider divider-bottom"></div>

      </div>
    </section>
  );
}