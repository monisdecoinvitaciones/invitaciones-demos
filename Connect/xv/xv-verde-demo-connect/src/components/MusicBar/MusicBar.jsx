"use client";
import { useState, useEffect } from "react";
import "./MusicBar.css";

export default function MusicBar() {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracion, setDuracion] = useState(1);
  const [arrastrando, setArrastrando] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    const actualizarEstado = () => {
      setReproduciendo(!audio.paused);
    };

    const actualizarTiempo = () => {
      if (!arrastrando) {
        setTiempoActual(audio.currentTime);
      }
      if (audio.duration && !isNaN(audio.duration)) {
        setDuracion(audio.duration);
      }
    };

    audio.addEventListener("play", actualizarEstado);
    audio.addEventListener("pause", actualizarEstado);
    audio.addEventListener("timeupdate", actualizarTiempo);

    return () => {
      audio.removeEventListener("play", actualizarEstado);
      audio.removeEventListener("pause", actualizarEstado);
      audio.removeEventListener("timeupdate", actualizarTiempo);
    };
  }, [arrastrando]);

  const toggleMusica = () => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;
    audio.paused ? audio.play() : audio.pause();
  };

  // Mientras arrastras solo movemos el UI
  const handleChange = (e) => {
    setTiempoActual(parseFloat(e.target.value));
  };

  // Cuando sueltas aplicamos el cambio real al audio
  const handleRelease = () => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    audio.currentTime = tiempoActual;
    setArrastrando(false);
  };

  const porcentaje = (tiempoActual / duracion) * 100;

  return (
    <div className="barra-musica">
      <button className="btn-control" onClick={toggleMusica}>
        {reproduciendo ? "❚❚" : "▶"}
      </button>

      <input
        type="range"
        min="0"
        max={duracion}
        value={tiempoActual}
        step="0.1"
        className="slider"
        onChange={handleChange}
        onMouseDown={() => setArrastrando(true)}
        onTouchStart={() => setArrastrando(true)}
        onMouseUp={handleRelease}
        onTouchEnd={handleRelease}
        style={{
          background: `linear-gradient(to right, #5f7161 ${porcentaje}%, rgba(95,113,97,0.2) ${porcentaje}%)`
        }}
      />
    </div>
  );
}
