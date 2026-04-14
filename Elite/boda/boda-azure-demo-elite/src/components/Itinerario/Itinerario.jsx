"use client";
import React from 'react';
import './Itinerario.css';
import { useAnimations } from "@/hooks/useAnimations";

// Iconos elegantes para boda
import { 
  FaChurch, 
  FaMusic, 
  FaMoon,
  FaGlassCheers,
  FaUtensils,
  FaCocktail 
} from "react-icons/fa"; 

const eventosBoda = [
  { 
    time: "05:00 PM", 
    title: "Ceremonia Religiosa", 
    icon: <FaChurch />, 
    desc: "Playa Brisa Dorada" 
  },
  { 
    time: "06:30 PM", 
    title: "Cóctel de Bienvenida", 
    icon: <FaCocktail />, 
    desc: "Terraza Coral Sunset" 
  },
  { 
    time: "08:30 PM", 
    title: "Recepción y Cena", 
    icon: <FaUtensils />, 
    desc: "Beach Club Perla Azul" 
  },
  { 
    time: "10:00 PM", 
    title: "Brindis y Primer Baile", 
    icon: <FaGlassCheers />, 
    desc: "Nuestra primera pieza como esposos" 
  },
  { 
    time: "11:00 PM", 
    title: "Apertura de Pista", 
    icon: <FaMusic />, 
    desc: "¡A celebrar toda la noche!" 
  },
  { 
    time: "02:00 AM", 
    title: "Fin de la Celebración", 
    icon: <FaMoon />, 
    desc: "Gracias por compartir este sueño" 
  }
];

export default function Itinerario() {
  useAnimations();

  return (
    <section className="itinerario-section" id='itinerario'>
      <div className="section-header">
        <span className="section-subtitle">NUESTRO PROTOCOLO</span>
        <h2 className="section-title2">Itinerario</h2>
        <div className="section-divider"></div>
      </div>

      <div className="itinerario-container">
        {/* Líneas decorativas de fondo */}
        <div className="itinerario-line-bg"></div>
        <div className="itinerario-line-progress"></div>

        {eventosBoda.map((item, index) => (
          <div key={index} className="itinerario-row">
            <div className="itinerario-dot">
              <span className="itinerario-icon-react">{item.icon}</span>
            </div>
            <div className="itinerario-content">
              <span className="itinerario-time">{item.time}</span>
              <div className="itinerario-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}