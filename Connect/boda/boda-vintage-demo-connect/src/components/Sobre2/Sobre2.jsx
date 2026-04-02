"use client";
import { useState, useEffect } from "react";
import './Sobre2.css';

export default function Sobre2() {
  const [abierto, setAbierto] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [visible]);

  const manejarApertura = () => {
    setAbierto(true);
    const audio = document.getElementById("audioPrincipal");
    if (audio) audio.play().catch(() => {});
    setTimeout(() => setVisible(false), 3500);
  };

  if (!visible) return null;

  return (
    <section className={`luxury-envelope-wrapper ${abierto ? "reveal" : ""}`}>
      <div className="fondo-mesa"></div>

      <div className="sobre-contenedor" onClick={manejarApertura}>
        <div className="solapa-superior"></div>
        <div className="cuerpo-sobre"></div>

        <div className="sello-lacre">
           <img src="/sello.png" alt="Sello" className="monograma-sello" />
        </div>

        {/* Invitación que sube */}
        <div className="invitacion-fisica">
          <div className="papel-textura">
            <span className="label-top">NUESTRA BODA</span>
            <div className="contenido-invitacion">
              <h1 className="nombres-lujo">Karina & Ulises</h1>
              <div className="linea-elegante"></div>
              <p className="fecha-lujo">24 . 07 . 2027</p>
            </div>
          </div>
        </div>

        {/* TEXTO DE INSTRUCCIÓN (Ahora fuera de la tarjeta para que se vea siempre) */}
        {!abierto && (
          <div className="instruccion-abrir">
            <p>TOCA PARA DESCUBRIR</p>
          </div>
        )}
      </div>
    </section>
  );
}