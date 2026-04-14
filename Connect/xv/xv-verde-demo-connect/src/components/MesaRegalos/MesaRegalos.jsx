"use client";
import { useAnimations } from "@/hooks/useAnimations";
import "./MesaRegalos.css";
import { LiaGiftSolid, LiaUniversitySolid } from "react-icons/lia";

export default function MesaRegalos() {
  // Hook para activar las animaciones de entrada al hacer scroll
  useAnimations();

  const manejarCopiado = (texto) => {
    navigator.clipboard.writeText(texto);
    alert("CLABE copiada al portapapeles");
  };

  return (
    <section className="regalos-section" id="regalos">
      <div className="regalos-container animar">
        
        {/* Tarjeta de Datos Bancarios (Estilo Ovalado Merlot) */}
        <div className="regalos-card-merlot">
          <div className="regalos-icon-top">
            <LiaUniversitySolid />
          </div>
          <h2 className="regalos-title">MESA DE REGALOS</h2>
          
          <div className="regalos-content">
            <p className="regalos-text-italic">Transferencia Bancaria</p>
            <p className="regalos-name">Karina</p>
            
            <div 
              className="regalos-clabe-box" 
              onClick={() => manejarCopiado("012 060 01937283940 6")}
              title="Click para copiar"
            >
              <p className="regalos-label">CLABE:</p>
              <p className="regalos-number">012 060 01937283940 6</p>
            </div>

            <div className="regalos-bank-info">
              <p>Cuenta: 120 350 2201</p>
              <p className="regalos-bank-name">BBVA</p>
            </div>
          </div>
        </div>

        {/* Tarjeta de Agradecimiento (Estilo Ovalado Moss Green) */}
        <div className="regalos-card-moss">
          <div className="regalos-icon-top">
            <LiaGiftSolid />
          </div>
          <p className="regalos-grace-text">
            "Su presencia es nuestro mejor regalo, pero si desean tener un detalle con nosotros, agradecemos su apoyo para comenzar nuestro nuevo hogar."
          </p>
        </div>

      </div>
    </section>
  );
}