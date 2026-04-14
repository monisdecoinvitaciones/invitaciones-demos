"use client";
import { useState, useEffect } from "react";
import './Musica.css';

export default function Musica() {
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    // Sincronizar estado inicial
    setReproduciendo(!audio.paused);

    // Escuchar eventos
    const handlePlay = () => setReproduciendo(true);
    const handlePause = () => setReproduciendo(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleMusica = () => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <button className="btn-musica" onClick={toggleMusica}>
      {reproduciendo ? (
        <svg viewBox="0 0 24 24" className="icono-musica">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="icono-musica">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
    </button>
  );
}
