"use client";
import { useState, useEffect } from "react";
import "./Sobre2.css";

export default function Sobre2() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);

  // Bloqueo de scroll mejorado
  useEffect(() => {
    if (visible) {
      // Bloqueamos scroll y eliminamos rebotes en móviles
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; 
    } else {
      // Restauramos todo al desmontar
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    // Cleanup para asegurar que se limpie si el componente se desmonta inesperadamente
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [visible]);

  const handleStart = () => {
    setActive(true);
    const audio = document.getElementById("audioPrincipal");
    if (audio) {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
    
    // Tiempo sincronizado con la animación lenta de 1.8s + margen
    setTimeout(() => setVisible(false), 2800);
  };

  if (!visible) return null;

  return (
    <section 
      className={`sobre-wrapper ${active ? "active-portal" : ""}`} 
      onClick={handleStart}
    >
      <div className="layer bg-sage"></div>
      <div className="layer bg-azure"></div>
      <div className="layer bg-cream"></div>

      <div className="main-content">
        <div className="editorial-frame">
          <header className="header-text">
            <span className="subtitle">NUESTRA BODA</span>
            <h1 className="main-name">Valentina & Julián</h1>
          </header>

          <div className="botanical-art">
            <svg viewBox="0 0 100 100" className="floating-flower" fill="none" stroke="#92966f" strokeWidth="0.8">
              <path d="M50 20 C60 40 90 40 50 80 C10 40 40 40 50 20" />
              <path d="M50 30 C30 50 30 70 50 90 C70 70 70 50 50 30" />
              <circle cx="50" cy="50" r="2" fill="#92966f" />
            </svg>
          </div>

          <footer className="footer-text">
            <p className="date-display">SÁBADO . 24 . 07 . 2027</p>
            {!active && (
              <div className="entry-action">
                <span className="line"></span>
                <p>ENTRAR</p>
                <span className="line"></span>
              </div>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
}