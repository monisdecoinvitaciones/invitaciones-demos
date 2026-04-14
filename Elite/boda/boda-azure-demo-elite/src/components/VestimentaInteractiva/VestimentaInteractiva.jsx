"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import './VestimentaInteractiva.css';

export default function VestimentaInteractiva() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.innerHTML = "";
      const anchor = document.createElement("a");
      anchor.setAttribute("data-pin-do", "embedBoard");
      // Calculamos el ancho del contenedor para que sea fluido
      const width = containerRef.current.offsetWidth;
      anchor.setAttribute("data-pin-board-width", width.toString());
      anchor.setAttribute("data-pin-scale-height", "400");
      anchor.setAttribute("data-pin-scale-width", "115");
      anchor.href = "https://mx.pinterest.com/sarahggtz/dress-code-boda-sla-formal-de-playa/";
      
      containerRef.current.appendChild(anchor);

      const script = document.createElement("script");
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.PinUtils) window.PinUtils.build();
      };
    }
  }, [isOpen]);

  return (
    <section className="vestimenta-section">
      <h2 className="vestimenta-main-title">Código de Vestimenta</h2>

      <div className="vestimenta-card-wrapper">
        {/* PARTE PRINCIPAL: SIEMPRE VISIBLE */}
        <div className="vestimenta-main-card">
          <div className="v-card-left">
             <Image
                src="/dressCode.png"
                alt="Icono Vestimenta"
                width={180}
                height={130}
                priority
                className="v-icon"
              />
          </div>
          
          <div className="v-card-right">
            <h3 className="vestimenta-tipo">FORMAL</h3>
            <div className="vestimenta-divider"></div>
            <div className="mini-dots">
              <span className="m-dot sage"></span>
              <span className="m-dot azure"></span>
              <span className="m-dot butter"></span>
              <span className="m-dot dark"></span>
            </div>
            <button className="btn-open-pinterest" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "CERRAR IDEAS" : "VER INSPIRACIÓN"}
            </button>
          </div>
        </div>

        {/* PANEL DESPLEGABLE (DRAWER) */}
        <div className={`pinterest-drawer ${isOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <p className="drawer-title">Inspiración para tu Outfit</p>
          </div>
          <div 
            className="pinterest-container-scroll" 
            ref={containerRef}
            suppressHydrationWarning={true}
          />
        </div>
      </div>
    </section>
  );
}