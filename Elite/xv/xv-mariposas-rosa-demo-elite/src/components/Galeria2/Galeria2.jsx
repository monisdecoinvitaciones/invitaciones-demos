"use client";
import { useState } from "react";
import './Galeria2.css';

export default function Galeria2() {
  const imagenes = [
    "/icons/foto1.jpg",
    "/icons/foto2.jpg",
    "/icons/foto3.jpg"
  ];

  const [index, setIndex] = useState(0);

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndex((prev) =>
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  return (
    <section className="galeria-seccion" id="galeria">
      <div className="galeria-contenido">
        <button onClick={anterior} className="btn-slider">‹</button>

        <div className="imagen-wrapper">
          <img src={imagenes[index]} alt="Galería boda" />
        </div>

        <button onClick={siguiente} className="btn-slider">›</button>
      </div>
    </section>
  );
}
