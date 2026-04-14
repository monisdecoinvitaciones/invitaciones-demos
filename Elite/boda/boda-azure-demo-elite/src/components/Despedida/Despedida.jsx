"use client";
import { useEffect, useState, useRef } from "react";
import './Despedida.css';

const Despedida = () => {
  const sectionRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  // Lógica de Parallax suave para la foto de fondo
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        // Solo ejecuta si la sección está cerca de ser visible
        if (top < window.innerHeight && top > -window.innerHeight * 2) {
          // Velocidad muy lenta (0.1) para un efecto sutil y elegante
          setOffsetY(top * 0.1); 
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="despedida-section" ref={sectionRef} id="despedida">
      {/* FOTO DE LOS NOVIOS CON PARALLAX */}
      <div 
        className="despedida-bg-photo"
        style={{ 
  backgroundImage: `url('/boda5/optimized/boda11.webp')`, // Nota las comillas simples dentro
  transform: `translate3d(0, ${offsetY}px, 0)` 
}}
      ></div>

      {/* OVERLAY AZUL PROFUNDO PARA LEGIBILIDAD */}
      <div className="despedida-overlay"></div>

      {/* CONTENIDO TEXTUAL */}
      <div className="despedida-content" data-aos="fade-up" data-aos-duration="1500">
        <span className="despedida-subtitle">NUESTRO AGRADECIMIENTO</span>
        
        <h2 className="despedida-title">¡Gracias por acompañarnos!</h2>
        
        <p className="despedida-text">
          Su presencia es el mejor regalo que podríamos recibir. <br />
          Estamos ansiosos por compartir este día tan especial con todos ustedes <br />
          y crear recuerdos que durarán para siempre.
        </p>

        <div className="despedida-signature">
          <span className="name">Valentina</span>
          <span className="ampersand">&</span>
          <span className="name">Julián</span>
        </div>

        {/* BOTÓN FINAL SUTIL */}
        <a href="#inicio" className="btn-back-top">
          Volver al inicio
        </a>
      </div>
    </section>
  );
};

export default Despedida;