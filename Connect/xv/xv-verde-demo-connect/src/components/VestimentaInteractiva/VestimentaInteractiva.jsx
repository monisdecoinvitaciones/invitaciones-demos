"use client";

import { useState } from "react";
import Image from "next/image";

import './VestimentaInteractiva.css';

/**
 * Componente VestimentaInteractiva
 * Presenta una tarjeta con efecto 3D flip para mostrar el código de vestimenta
 * y las sugerencias de colores al hacer clic/tap.
 */
export default function VestimentaInteractiva() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="vestimenta-section animar">
      <div 
        className={`flip-card-container ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleFlip}
        aria-label="Tarjeta de código de vestimenta, haz clic para girar"
      >
        <div className="flip-card-inner">
          
          {/* --- CARA FRONTAL: INFO GENERAL --- */}
          <div className="flip-card-front">
            {/* PNG Flotante optimizado */}
            <div className="vestimenta-image-floating">
              <Image 
                src="/icons/vestimenta2.png" 
                alt="Icono Vestimenta"
                width={140} 
                height={140}
                priority
                className="img-fluid"
              />
            </div>
            
            <div className="vestimenta-card-content">
              <h2 className="vestimenta-title">Código de Vestimenta</h2>
              <div className="vestimenta-divider"></div>
              <h3 className="vestimenta-tipo">FORMAL</h3>
              <p className="instruction-text">Toca para ver detalles</p>
            </div>
          </div>

          {/* --- CARA TRASERA: PALETA DE COLORES --- */}
          <div className="flip-card-back">
            <div className="vestimenta-card-content">
              <h3 className="back-title">SUGERENCIAS DE COLOR</h3>
              
              {/* Colores Sugeridos (Eucalyptus, Moss, Burgundy) */}
              <div className="color-section">
                <p className="color-label">Paleta Sugerida:</p>
                <div className="color-dots">
                  <span className="dot burgundy" title="Burgundy"></span>
                  <span className="dot moss" title="Moss Green"></span>
                  <span className="dot olive" title="Olive"></span>
                  <span className="dot sand" title="Sand"></span>
                </div>
              </div>

              {/* Colores Prohibidos/Reservados */}
              <div className="color-section prohibited">
                <p className="color-label">Colores Reservados:</p>
                <div className="color-dots">
                  <span className="dot white" title="Blanco"></span>
                  <span className="dot ivory" title="Marfil/Ivory"></span>
                </div>
                <p className="disclaimer">* Exclusivos para la novia</p>
              </div>

              <p className="return-text">Toca para volver</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}