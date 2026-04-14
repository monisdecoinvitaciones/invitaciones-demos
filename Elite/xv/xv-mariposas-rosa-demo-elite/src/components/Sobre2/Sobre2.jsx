"use client";
import { useState, useEffect } from "react";
import "./Sobre2.css";

export default function Sobre2() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Bloqueamos el scroll al montar el componente
    if (visible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Limpieza al desmontar
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [visible]);

  const handleStart = () => {
    if (active) return; // Evita clics múltiples durante la animación

    setActive(true);
    
    // Reproducción de audio (asegúrate de que el ID coincida en tu layout)
    const audio = document.getElementById("audioPrincipal");
    if (audio) {
      audio.play().catch((error) => console.log("Audio play blocked:", error));
    }
    
    // Duración de la animación antes de desaparecer por completo
    setTimeout(() => {
      setVisible(false);
    }, 2800);
  };

  if (!visible) return null;

  return (
    <section 
      className={`sobre-wrapper ${active ? "active-portal" : ""}`} 
      onClick={handleStart}
    >
      {/* Cortinas laterales */}
      <div className="curtain curtain-left"></div>
      <div className="curtain curtain-right"></div>

      {/* Explosión de mariposas */}
      <div className="butterfly-burst">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`burst-bfly bfly-${i}`}></div>
        ))}
      </div>

      {/* Contenedor de la invitación */}
      <div className="main-container">
        <div className="decor-frame">
          <span className="event-type">MIS QUINCE AÑOS</span>
          <h1 className="name-title">Valentina</h1>
          
          <div className="butterfly-seal">
            <img src="/mariposas/5.png" alt="butterfly-seal" />
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