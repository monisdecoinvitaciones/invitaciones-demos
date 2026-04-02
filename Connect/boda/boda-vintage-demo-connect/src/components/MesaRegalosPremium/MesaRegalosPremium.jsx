"use client";
import { useRef, useState, useEffect } from "react";
import "./MesaRegalosPremium.css";

const tarjetas = [
  { 
    nombre: "Amazon", 
    imagen: "/botonesMesaRegalos/btn-amazon.png", 
    url: "https://www.amazon.com.mx" // <-- Añade el link aquí
  },
  { 
    nombre: "Sears", 
    imagen: "/botonesMesaRegalos/btn-sears.png", 
    url: "https://www.sears.com.mx" 
  },
  { 
    nombre: "Liverpool", 
    imagen: "/botonesMesaRegalos/btn-liverpool.jpg", 
    url: "https://mesaderegalos.liverpool.com.mx" 
  },
];

export default function MesaRegalosPremium() {
  const sliderRef = useRef(null);
  const [indiceActivo, setIndiceActivo] = useState(0);

  // --- FUNCIÓN PARA MOVER EL SCROLL ---
  const scrollToIndex = (index) => {
    const container = sliderRef.current;
    // Validamos que el índice exista dentro de nuestro array
    if (container && index >= 0 && index < tarjetas.length) {
      const targetWrapper = container.children[index];
      
      // Al usar wrappers de 100% ancho, el cálculo es mucho más simple y exacto
      container.scrollTo({
        left: targetWrapper.offsetLeft,
        behavior: "smooth"
      });
    }
  };

  // --- DETECTOR DE POSICIÓN (ACTIVE STATE) ---
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      
      // Calculamos qué tarjeta está en el centro basándonos en el ancho del wrapper
      const newIndex = Math.round(scrollLeft / containerWidth);

      if (newIndex !== indiceActivo && newIndex >= 0 && newIndex < tarjetas.length) {
        setIndiceActivo(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [indiceActivo]);

  return (
    
    <div className="mesa-premium">
        <h2 className="hospedaje-titulo text-white txt-huge">Mesa de regalos</h2>
      {/* Flechas de navegación (ocultas en móvil vía CSS) */}
      <button 
        className="arrow left" 
        onClick={() => scrollToIndex(indiceActivo - 1)}
        style={{ visibility: indiceActivo === 0 ? "hidden" : "visible" }}
      >
        ❮
      </button>

      <div className="slider-premium" ref={sliderRef}>
        {tarjetas.map((item, index) => (
          /* El card-wrapper asegura el centrado perfecto y el espacio de la sombra */
          <div key={index} className="card-wrapper">
            <div
              className={`card-premium ${index === indiceActivo ? "active" : ""}`}
              onClick={() => scrollToIndex(index)}
            >
              <div className="card-top">
  <img src={item.imagen} alt={item.nombre} />
</div>
              <a 
  href={item.url} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="card-bottom"
  onClick={(e) => e.stopPropagation()} // Evita que el click active el scroll del slider
>
  IR A MESA
</a>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="arrow right" 
        onClick={() => scrollToIndex(indiceActivo + 1)}
        style={{ visibility: indiceActivo === tarjetas.length - 1 ? "hidden" : "visible" }}
      >
        ❯
      </button>

      {/* Indicadores (Dots) */}
      <div className="dots">
        {tarjetas.map((_, index) => (
          <span
            key={index}
            className={index === indiceActivo ? "dot active-dot" : "dot"}
            onClick={() => scrollToIndex(index)}
          ></span>
        ))}
      </div>

      <div className="hint text-white">Desliza para ver más →</div>
    </div>
  );
}