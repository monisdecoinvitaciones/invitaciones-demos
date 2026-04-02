"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './Frase.css';

export default function Frase() {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

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

  const parallaxValue = offset * 0.1;

  return (
    <section ref={sectionRef} className="frase-section">
      {/* Flor 1: Superior Izquierda */}
      <div 
        className="flor-decor-1"
        style={{ transform: `translateY(${parallaxValue * 0.4}px) rotate(-15deg)` }}
      >
        <Image 
          src="/icons/flor.png" 
          alt="Decoración floral"
          width={400} 
          height={400}
          priority
          className="img-responsive-flor"
        />
      </div>

      {/* Flor 2: Inferior Derecha */}
      <div 
        className="flor-decor-2"
        style={{ transform: `translateY(${parallaxValue * -0.4}px) rotate(160deg) scaleX(-1)` }}
      >
        <Image 
          src="/icons/flor.png" 
          alt="Decoración floral"
          width={450} 
          height={450}
          priority
          className="img-responsive-flor"
        />
      </div>

      <div className="frase-container">
        <div className="frase-icon-wrapper">
          <Image 
            src="/icons/flor.png" 
            alt="Icono central"
            fill
            className="frase-png-icon"
            priority
          />
        </div>

        <blockquote className="frase-texto">
          "And suddenly, all the love songs were about you."
        </blockquote>

        <div className="frase-divider"></div>
        
        <p className="frase-autor">PORQUE EL AMOR ES NUESTRA MEJOR AVENTURA</p>
      </div>
    </section>
  );
}