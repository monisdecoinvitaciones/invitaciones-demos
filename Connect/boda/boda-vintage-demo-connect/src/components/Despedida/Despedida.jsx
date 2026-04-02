"use client";
import { useEffect, useRef, useState } from "react";
import './Despedida.css';

const Despedida = () => {
  const [isVisible, setIsVisible] = useState(false);
  const seccionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (seccionRef.current) observer.observe(seccionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className={`despedida-full ${isVisible ? 'is-visible' : ''}`} 
      ref={seccionRef}
      style={{ backgroundImage: `url('/Boda4/optimized/boda11.webp')` }}
    >
      <div className="despedida-overlay-dark"></div>
      
      <div className="despedida-content-center">
        <h2 className="txt-script">¡No Faltes!</h2>
        <div className="divider-gold"></div>
        <p className="txt-mensaje">
          Nuestra historia no estaría completa <br/> 
          <strong>sin tu presencia.</strong>
        </p>
        <div className="txt-firmas">
          <p>Con amor,</p>
          <h3>Karina & Ulises</h3>
        </div>
      </div>
    </section>
  );
};

export default Despedida;