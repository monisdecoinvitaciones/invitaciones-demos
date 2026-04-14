"use client";
import { useState, useEffect, useRef } from "react";
import './Hashtag.css';

export default function Hashtag() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const hashtag = "#BodaValentina&Julián";

  const handleCopy = () => {
    navigator.clipboard.writeText(hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.disconnect(); };
  }, []);

  return (
    <section 
      className={`hashtag-section ${isVisible ? 'is-visible' : ''}`} 
      ref={sectionRef}
    >
      {/* Decoración de fondo */}
      <div className="hashtag-bg-text">MOMENTS</div>

      <div className="hashtag-container">
        <div className="hashtag-content">
          <p className="hashtag-pretitle">COMPARTE NUESTRA FELICIDAD</p>
          
          <div className="hashtag-main-box">
            <h2 className="hashtag-text">{hashtag}</h2>
            <div className="hashtag-line"></div>
          </div>

          <p className="hashtag-instruction">
            Usa nuestro hashtag en tus fotos de Instagram y Facebook
          </p>

          <button 
            className={`copy-button ${copied ? "copied" : ""}`} 
            onClick={handleCopy}
          >
            {copied ? "¡COPIADO!" : "COPIAR HASHTAG"}
          </button>
        </div>
      </div>
    </section>
  );
}