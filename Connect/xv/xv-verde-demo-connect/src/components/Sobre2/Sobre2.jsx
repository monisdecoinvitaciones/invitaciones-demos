"use client";
import { useState, useEffect } from "react";
import './Sobre2.css';

export default function Sobre2() {
  const [abierto, setAbierto] = useState(false);
  const [visible, setVisible] = useState(true);
  const [luciernagas, setLuciernagas] = useState([]);

  useEffect(() => {
    // Generamos las luciérnagas
    const nuevasLuciernagas = [...Array(12)].map((_, i) => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      duration: `${6 + Math.random() * 4}s`,
      delay: `${Math.random() * 2}s`
    }));
    setLuciernagas(nuevasLuciernagas);
  }, []);

  useEffect(() => {
    if (visible) {
      // Bloqueo de scroll elegante
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Liberación de scroll
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      // Limpieza por si el componente se desmonta inesperadamente
      document.body.style.position = "";
      document.body.style.overflow = "";
    };
  }, [visible]);

  const manejarApertura = () => {
    if (abierto) return;
    setAbierto(true);
    
    const audio = document.getElementById("audioPrincipal");
    if (audio) audio.play().catch(() => {});

    // Sincronizado con la animación de CSS:
    // La tarjeta sube en 1.8s, damos un tiempo para leer y luego liberamos.
    // Reducido de 8500ms a 4500ms para que no se sienta "pausado"
    setTimeout(() => {
      setVisible(false);
    }, 4500); 
  };

  if (!visible) return null;

  return (
    <section className={`luxury-envelope-wrapper ${abierto ? "reveal" : ""}`}>
      <div className="fondo-mesa"></div>
      
      {luciernagas.map((luc, i) => (
        <div 
          key={i}
          className="luciernaga" 
          style={{ 
            top: luc.top, 
            left: luc.left, 
            animationDelay: luc.delay,
            animationDuration: luc.duration
          }} 
        />
      ))}

      <div className="sobre-contenedor" onClick={manejarApertura}>
        <img src="/princesa/optimized/corona.webp" alt="Corona" className="decoracion-png corona-img" />
        
        <div className="solapa-superior"></div>
        <div className="cuerpo-sobre"></div>

        <div className="sello-lacre">
           <img src="/princesa/optimized/flor.webp" alt="Sello" className="monograma-sello" />
        </div>

        <div className="invitacion-fisica">
          <div className="papel-textura">
            <span className="label-top">MIS XV AÑOS</span>
            <div className="contenido-invitacion">
              <h1 className="nombres-lujo">Mariana Isabel</h1>
              <div className="linea-elegante"></div>
              <p className="fecha-lujo">24 . 07 . 2027</p>
            </div>
          </div>
        </div>

        <div className="instruccion-abrir">
          <p>Toca para descubrir</p>
        </div>
      </div>
    </section>
  );
}