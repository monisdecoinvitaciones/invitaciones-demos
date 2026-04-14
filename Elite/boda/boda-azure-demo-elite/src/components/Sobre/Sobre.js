"use client";
import { useState, useEffect } from "react"; // Importamos useEffect
import './Sobre.css';

export default function Sobre() {
  const [abierto, setAbierto] = useState(false);
  const [visible, setVisible] = useState(true);

  // EFECTO PARA BLOQUEAR SCROLL AL INICIO
  useEffect(() => {
    if (visible) {
      document.body.classList.add("bloqueado");
    }
    
    // Limpieza al desmontar el componente (por seguridad)
    return () => document.body.classList.remove("bloqueado");
  }, [visible]);

  const manejarApertura = () => {
    setAbierto(true);

    const audio = document.getElementById("audioPrincipal");
    if (audio) {
      audio.play().catch((error) => console.log("Bloqueo de autoplay:", error));
    }

    // QUITAMOS LA CLASE AL ABRIR
    document.body.classList.remove("bloqueado");

    setTimeout(() => {
      setVisible(false);
    }, 1600);
  };

  if (!visible) return null;

  return (
    <section className={`sobre-container ${abierto ? "abierto" : ""}`} id="sobreContainer">
      <div className="logo-circular" onClick={manejarApertura}>
        <img src="/monograma.png" alt="Monograma" />
        <p className="text-white txt-medium">Haz clic para abrir</p>
      </div>

      <div className="sobre-parte arriba"></div>
      <div className="sobre-parte abajo"></div>
    </section>
  );
}