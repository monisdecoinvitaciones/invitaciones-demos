"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Countdown.css';

export default function Countdown() {
  const targetDate = new Date("2027-07-24T16:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff < 0) return null;
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const timeData = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MINUTOS", value: timeLeft.minutes },
    { label: "SEGUNDOS", value: timeLeft.seconds },
  ];

  return (
    <section className="magic-countdown">
      {/* RENDERIZADO DE LUCIÉRNAGAS */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="luciernaga-magic" />
      ))}

      <div className="magic-container">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="magic-subtitle"
        >
          Solo faltan...
        </motion.span>
        
        <div className="magic-grid">
          {timeData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="magic-circle-wrapper"
            >
              <div className="magic-circle">
                <span className="circle-number">{item.value}</span>
                <span className="circle-label">{item.label}</span>
              </div>
              <svg className="circle-svg-ring">
                <circle cx="50%" cy="50%" r="48%" />
              </svg>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="magic-date-footer"
        >
          <span className="date-text">SÁBADO . 24 DE JULIO . 2027</span>
        </motion.div>

        {/* CONTENEDOR PARA EL SAPO */}
        <motion.img 
          src="/princesa/sapo.png" 
          alt="Sapo decorativo"
          className="sapo-decor"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}