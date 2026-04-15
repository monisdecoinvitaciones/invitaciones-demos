import React, { useRef, useEffect, useState } from 'react';
import './FraseSection.css';

const FraseSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.disconnect(); };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`elite-quote-section ${isVisible ? 'elite-animate-in' : ''}`}
    >
      {/* Polvo de estrellas de fondo */}
      <div className="elite-quote-stars"></div>

      {/* Decoración flotante */}
      <div className="elite-quote-decorations">
        <img src="/mariposas/optimized/2.webp" className="elite-quote-float eq-b1" alt="Mariposa" />
        <img src="/mariposas/optimized/2.webp" className="elite-quote-float eq-b2" alt="Mariposa" />
        <img src="/mariposas/optimized/3.webp" className="elite-quote-float eq-f1" alt="Flor" />
        <img src="/mariposas/optimized/3.webp" className="elite-quote-float eq-f2" alt="Flor" />
      </div>

      <div className="elite-quote-container">
        <div className="elite-quote-divider"></div>
        
        <blockquote className="elite-quote-wrapper">
          <span className="elite-quote-mark elite-open">“</span>
          <p>
            Dejaré volar mis sueños <br />
            <span className="elite-quote-highlight">y con polvo de estrellas</span> <br />
            pintaré mi propio cielo.
          </p>
          <span className="elite-quote-mark elite-close">”</span>
        </blockquote>

        <div className="elite-quote-divider"></div>
      </div>
    </section>
  );
};

export default FraseSection;