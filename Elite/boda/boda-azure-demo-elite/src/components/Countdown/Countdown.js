"use client";
import { useEffect, useState, useRef } from "react";
import "./Countdown.css";

const Countdown = () => {
  const sectionRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const targetDate = new Date("2027-07-24T18:00:00").getTime(); 
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        if (top < window.innerHeight && top > -window.innerHeight) {
          setOffsetY(top * 0.15);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="countdown-section" ref={sectionRef}>
      <div 
        className="parallax-bg" 
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      ></div>

      <div className="countdown-overlay">
        <div className="countdown-flex-container">
          
          {/* FECHA IMPACTANTE */}
          <div className="wedding-date-hero">
            <span className="date-pre">SÁBADO</span>
            <div className="date-main">
              <span className="big-number">24</span>
              <div className="date-column">
                <span className="month">JUL</span>
                <span className="year">2027</span>
              </div>
            </div>
          </div>

          <div className="vertical-divider"></div>

          {/* CONTADOR COMPACTO */}
          <div className="countdown-content">
            <h2 className="countdown-title-compact">Faltan para el "Sí"</h2>
            <div className="countdown-grid-compact">
              <div className="unit">
                <span className="num">{timeLeft.days}</span>
                <span className="lab">Días</span>
              </div>
              <div className="unit">
                <span className="num">{timeLeft.hours}</span>
                <span className="lab">Hrs</span>
              </div>
              <div className="unit">
                <span className="num">{timeLeft.minutes}</span>
                <span className="lab">Min</span>
              </div>
              <div className="unit">
                <span className="num">{timeLeft.seconds}</span>
                <span className="lab">Seg</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Countdown;