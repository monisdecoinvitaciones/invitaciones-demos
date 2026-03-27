"use client";
import { useState, useEffect, useRef } from "react";
import './Musica.css';

export default function Musica() {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [yaInicio, setYaInicio] = useState(false);
  const audioRef = useRef(null);

  const VOLUMEN_MAXIMO = 0.1; 

  useEffect(() => {
    // Buscamos el audio por ID (asegúrate de que tu etiqueta <audio> tenga este ID)
    audioRef.current = document.getElementById("audioPrincipal");
    if (!audioRef.current) return;

    setReproduciendo(!audioRef.current.paused);

    const handlePlay = () => setReproduciendo(true);
    const handlePause = () => setReproduciendo(false);

    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  const fadeIn = (audio) => {
    audio.volume = 0;
    const intervalo = setInterval(() => {
      if (audio.volume < (VOLUMEN_MAXIMO - 0.01)) {
        audio.volume += 0.01;
      } else {
        audio.volume = VOLUMEN_MAXIMO;
        clearInterval(intervalo);
      }
    }, 100);
  };

  const toggleMusica = () => {
    const audio = audioRef.current || document.getElementById("audioPrincipal");
    if (!audio) return;

    if (audio.paused) {
      if (!yaInicio) {
        setYaInicio(true);
        fadeIn(audio);
      } else {
        audio.volume = VOLUMEN_MAXIMO;
      }
      audio.play().catch(err => console.log("Error al reproducir:", err));
    } else {
      audio.pause();
    }
  };

  return (
    <div className="contenedor-musica-fijo">
      <button 
        className={`btn-musica ${reproduciendo ? 'pulsando' : ''}`} 
        onClick={toggleMusica}
        aria-label={reproduciendo ? "Pausar música" : "Reproducir música"}
      >
        {reproduciendo ? (
          <svg viewBox="0 0 24 24" className="icono-musica">
            <rect x="6" y="4" width="3" height="16" fill="currentColor" />
            <rect x="15" y="4" width="3" height="16" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="icono-musica">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* El letrerito solo aparece si no se está reproduciendo */}
      {!reproduciendo && (
        <span className="hint-musica">Música</span>
      )}
    </div>
  );
}