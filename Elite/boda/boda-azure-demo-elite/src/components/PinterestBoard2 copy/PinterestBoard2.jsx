"use client";
import { useEffect, useState, useRef } from "react";
import './PinterestBoard2.css';

export default function PinterestBoard2() {
  const [boardWidth, setBoardWidth] = useState(900);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      // Ajuste dinámico para que no se corte en ningún celular
      const padding = window.innerWidth < 768 ? 40 : 80;
      const newWidth = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth - padding;
      
      // Limitamos el ancho máximo a 1000px
      setBoardWidth(newWidth > 1000 ? 1000 : newWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      
      const anchor = document.createElement("a");
      anchor.setAttribute("data-pin-do", "embedBoard");
      anchor.setAttribute("data-pin-board-width", boardWidth.toString());
      anchor.setAttribute("data-pin-scale-height", "320");
      anchor.setAttribute("data-pin-scale-width", "100");
      anchor.href = "https://mx.pinterest.com/sarahggtz/dress-code-boda-sla-formal-de-playa/";
      
      containerRef.current.appendChild(anchor);

      // Recargar el widget de Pinterest si ya existe el script
      if (window.PinUtils) {
        window.PinUtils.build();
      }
    }

    const script = document.createElement("script");
    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.PinUtils) window.PinUtils.build();
    };

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [boardWidth]);

  return (
    <section className="dresscode-section">
      <h2 className="dresscode-inspiration-title">INSPIRACIÓN</h2>
      <p className="dresscode-subtitle">
        Seleccionamos algunas ideas para ayudarte a elegir el outfit perfecto.
      </p>

      <div className="pinterest-outer-box">
        <div 
          className="pinterest-container" 
          ref={containerRef}
          suppressHydrationWarning={true} 
        >
          {/* El widget se inyecta aquí */}
        </div>
      </div>
    </section>
  );
}