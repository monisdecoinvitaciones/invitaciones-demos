"use client";
import { useEffect, useState, useRef } from "react";
import './PinterestBoard.css';

export default function PinterestBoard() {
  const [boardWidth, setBoardWidth] = useState(900);
  const containerRef = useRef(null); // Referencia para el contenedor de Pinterest

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 768) {
        setBoardWidth(window.innerWidth - 40);
      } else {
        setBoardWidth(1000);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    // --- LÓGICA PARA EVITAR EL ERROR DE HIDRATACIÓN ---
    if (containerRef.current) {
      // Limpiamos el contenedor antes de inyectar el nuevo enlace
      containerRef.current.innerHTML = "";
      
      const anchor = document.createElement("a");
      anchor.setAttribute("data-pin-do", "embedBoard");
      anchor.setAttribute("data-pin-board-width", boardWidth.toString());
      anchor.setAttribute("data-pin-scale-height", "320");
      anchor.setAttribute("data-pin-scale-width", "100");
      anchor.href = "https://mx.pinterest.com/sarahggtz/dress-code-boda-sla-formal-de-playa/";
      
      containerRef.current.appendChild(anchor);
    }

    // Cargar el script de Pinterest
    const script = document.createElement("script");
    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.PinUtils) {
        window.PinUtils.build();
      }
    };

    // --- LIMPIEZA SEGURA ---
    return () => {
      window.removeEventListener("resize", updateWidth);
      // Solo removemos el script si realmente existe como hijo del body
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [boardWidth]); // Se vuelve a ejecutar si el ancho cambia para re-dibujar el tablero

  return (
    <section className="dresscode-section">
      <p className="dresscode-subtitle">
        ¡Te dejamos unas ideas para que te puedan servir de inspiración!
      </p>

      {/* Usamos el ref aquí. 
          React ahora ignorará lo que pase dentro de este div, 
          evitando el error de "removeChild".
      */}
      <div 
        className="pinterest-container" 
        ref={containerRef}
        suppressHydrationWarning={true} 
      >
        {/* El contenido se inyecta vía useEffect */}
      </div>
    </section>
  );
}