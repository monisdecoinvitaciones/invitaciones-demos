"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import './Hashtag.css';

export default function Hashtag() {
  const [copiado, setCopiado] = useState(false);
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);
  
  const hashtagText = "#XVañosMarianaIsabel";

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        setOffset(top);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hashtagText);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const parallaxValue = offset * 0.1;

  return (
    <section ref={sectionRef} className="hashtag-section">
      {/* Flor Decorativa 1 (Superior Izquierda) */}
      <div 
        className="hashtag-flor-1"
        style={{ transform: `translateY(${parallaxValue * 0.4}px) rotate(-15deg)` }}
      >
        <Image 
          src="/princesa/optimized/flor.webp" 
          alt="Decoración floral"
          width={400} 
          height={400}
          priority
          className="img-responsive-flor"
        />
      </div>

      {/* Flor Decorativa 2 (Inferior Derecha) */}
      <div 
        className="hashtag-flor-2"
        style={{ transform: `translateY(${parallaxValue * -0.4}px) rotate(160deg) scaleX(-1)` }}
      >
        <Image 
          src="/princesa/optimized/flor.webp" 
          alt="Decoración floral"
          width={450} 
          height={450}
          priority
          className="img-responsive-flor"
        />
      </div>

      <div className="hashtag-container">
        <span className="hashtag-pretitle">COMPARTE TUS MOMENTOS</span>
        
        <h2 className="hashtag-main" onClick={handleCopy}>
          {hashtagText}
        </h2>

        <button 
          className={`hashtag-copy-btn ${copiado ? 'copiado' : ''}`} 
          onClick={handleCopy}
        >
          {copiado ? "¡COPIADO!" : "TOCA PARA COPIAR"}
        </button>

        <p className="hashtag-footer">
          Usa mi hashtag en tus fotos y videos de Instagram y TikTok
        </p>
      </div>
    </section>
  );
}