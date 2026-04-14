import React, { useRef, useEffect, useState } from 'react';
import './FraseSection.css';

const FraseSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.disconnect(); };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`coastal-quote-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="coastal-bg-overlay"></div>

      <div className="coastal-quote-container">
        <div className="quote-content-wrapper">
          {/* Cactus Izquierdo */}
          <img src="/icons/cactus.webp" alt="cactus" className="cactus-icon left" />
          
          <blockquote className="coastal-blockquote">
            <p className="line-1">"En el silencio de un jardín,</p>
            <p className="line-2">dos almas encuentran</p>
            <p className="line-3 highlight">su eterno amanecer."</p>
          </blockquote>

          {/* Cactus Derecho */}
          <img src="/icons/cactus.webp" alt="cactus" className="cactus-icon right" />
        </div>

        <div className="quote-footer">
          <span className="quote-author">— Proverbio de Amor</span>
        </div>
      </div>

      <div className="corner-decor top-left"></div>
      <div className="corner-decor bottom-right"></div>
    </section>
  );
};

export default FraseSection;