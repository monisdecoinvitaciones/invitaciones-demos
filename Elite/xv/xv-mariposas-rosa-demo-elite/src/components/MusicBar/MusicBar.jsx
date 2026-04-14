"use client";
import { useState, useEffect } from "react";
import "./MusicBar.css";

export default function MusicBar() {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(5); 
  const [duracion, setDuracion] = useState(1);
  const [arrastrando, setArrastrando] = useState(false);

  // 1. EFECTO ÚNICO DE CARGA (Solo se ejecuta una vez al montar)
  useEffect(() => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    const inicializarAudio = () => {
      audio.currentTime = 5;
      setTiempoActual(5);
    };

    if (audio.readyState >= 1) {
      inicializarAudio();
    } else {
      audio.addEventListener("loadedmetadata", inicializarAudio, { once: true });
    }
    
    // Cleanup del listener de carga
    return () => {
      audio.removeEventListener("loadedmetadata", inicializarAudio);
    };
  }, []); // Array vacío = solo al cargar la página

  // 2. EFECTO DE EVENTOS (Play, Pause, TimeUpdate, Ended)
  useEffect(() => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    const manejarReinicio = () => {
      audio.currentTime = 5;
      setTiempoActual(5);
      // Solo volvemos a dar play si estaba reproduciendo
      if (reproduciendo) audio.play();
    };

    const actualizarEstado = () => {
      setReproduciendo(!audio.paused);
    };

    const actualizarTiempo = () => {
      // SOLO actualizamos el estado si el usuario NO está moviendo la barra
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
    audio.addEventListener("ended", manejarReinicio);

    return () => {
      audio.removeEventListener("play", actualizarEstado);
      audio.removeEventListener("pause", actualizarEstado);
      audio.removeEventListener("timeupdate", actualizarTiempo);
      audio.removeEventListener("ended", manejarReinicio);
    };
  }, [arrastrando, reproduciendo]); // Escucha cambios en estos estados para no perder la referencia

  const toggleMusica = () => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;
    audio.paused ? audio.play() : audio.pause();
  };

  const handleChange = (e) => {
    setTiempoActual(parseFloat(e.target.value));
  };

  const handleRelease = () => {
    const audio = document.getElementById("audioPrincipal");
    if (!audio) return;

    // Forzamos mínimo segundo 5
    const nuevoTiempo = tiempoActual < 5 ? 5 : tiempoActual;
    audio.currentTime = nuevoTiempo;
    setTiempoActual(nuevoTiempo);
    setArrastrando(false); // Liberamos el control para que el audio mande
  };

  const porcentaje = (tiempoActual / duracion) * 100;

  return (
    <div className="barra-musica">
      <button className="btn-control" onClick={toggleMusica}>
        {reproduciendo ? "❚❚" : "▶"}
      </button>

      <input
        type="range"
        min="5" 
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
  background: `linear-gradient(to right, #d38c9d ${porcentaje}%, rgba(211, 138, 157, 0.2) ${porcentaje}%)`
}}
      />
    </div>
  );
}