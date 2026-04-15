"use client";
import { useState, useEffect } from "react";
import "./Sobre2.css";

export default function Sobre2() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Bloqueo inmediato del scroll
    if (visible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [visible]);

  const handleStart = () => {
    if (active) return;
    setActive(true);
    
    const audio = document.getElementById("audioPrincipal");
    if (audio) {
      audio.play().catch((error) => console.log("Audio play blocked:", error));
    }
    
    // Solo dejamos la espera para que termine la animación de apertura antes de desmontar
    setTimeout(() => {
      setVisible(false);
    }, 2800);
  };

  if (!visible) return null;

  return (
    <section 
      className={`sobre-wrapper ${active ? "active-portal" : ""}`} 
      onClick={handleStart}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000, // Z-index altísimo para ganar al Hero
        backgroundColor: '#fdf2f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="curtain curtain-left" style={{ backgroundColor: '#f7d7da', left: 0 }}></div>
      <div className="curtain curtain-right" style={{ backgroundColor: '#f7d7da', right: 0 }}></div>

      <div className="butterfly-burst">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`burst-bfly bfly-${i}`}></div>
        ))}
      </div>

      <div className="main-container">
        <div className="decor-frame">
          <span className="event-type">MIS QUINCE AÑOS</span>
          <h1 className="name-title">Valentina</h1>
          
          <div className="butterfly-seal">
            <img src="/mariposas/optimized/5.webp" alt="butterfly-seal" />
          </div>
          
          <p className="event-date">25 . 10 . 2027</p>
        </div>

        {!active && (
          <div className="touch-hint">
            <p>TOCA PARA ABRIR</p>
          </div>
        )}
      </div>
    </section>
  );
}