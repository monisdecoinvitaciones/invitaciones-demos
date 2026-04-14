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
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [visible]);

  const manejarApertura = () => {
    if (abierto) return;
    setAbierto(true);
    const audio = document.getElementById("audioPrincipal");
    if (audio) audio.play().catch(() => {});
    setTimeout(() => setVisible(false), 8500);
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
        <img src="/princesa/corona.png" alt="Corona" className="decoracion-png corona-img" />
        
        <div className="solapa-superior"></div>
        <div className="cuerpo-sobre"></div>

        <div className="sello-lacre">
           <img src="/princesa/flor.png" alt="Sello" className="monograma-sello" />
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