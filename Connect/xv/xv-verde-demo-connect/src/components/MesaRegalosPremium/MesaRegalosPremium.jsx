"use client";
import { useRef, useState, useEffect } from "react";
import "./MesaRegalosPremium.css";

const tarjetas = [
  { nombre: "Amazon", imagen: "/botonesMesaRegalos/btn-amazon.png", url: "https://www.amazon.com.mx" },
  { nombre: "Sears", imagen: "/botonesMesaRegalos/btn-sears.png", url: "https://www.sears.com.mx" },
  { nombre: "Liverpool", imagen: "/botonesMesaRegalos/btn-liverpool.jpg", url: "https://mesaderegalos.liverpool.com.mx" },
];

export default function MesaRegalosPremium() {
  const sliderRef = useRef(null);
  const [indiceActivo, setIndiceActivo] = useState(0);

  const handleScroll = () => {
    const container = sliderRef.current;
    if (container && window.innerWidth <= 768) {
      const { scrollLeft, offsetWidth } = container;
      const index = Math.round(scrollLeft / offsetWidth);
      if (index !== indiceActivo) {
        setIndiceActivo(index);
      }
    }
  };

  const scrollToCard = (index) => {
    const container = sliderRef.current;
    if (container) {
      container.scrollTo({
        left: index * container.offsetWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="mesa-premium" id="regalos">
      <h2 className="titulo-seccion-mesa">Mesa de regalos</h2>
      
      <div 
        className="slider-premium" 
        ref={sliderRef}
        onScroll={handleScroll}
      >
        {tarjetas.map((item, index) => (
          <div key={index} className="card-wrapper">
            <div className={`card-premium ${index === indiceActivo ? "active" : ""}`}>
              <div className="card-top">
                <img src={item.imagen} alt={item.nombre} />
              </div>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="card-bottom"
              >
                IR A MESA
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* El CSS se encarga de que esto no aparezca en PC */}
      <div className="dots">
        {tarjetas.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === indiceActivo ? "active-dot" : ""}`}
            onClick={() => scrollToCard(index)}
          />
        ))}
      </div>

      <div className="hint">
        Desliza para ver más opciones
      </div>
    </section>
  );
}