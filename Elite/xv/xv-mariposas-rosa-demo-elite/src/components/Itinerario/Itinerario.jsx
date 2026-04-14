"use client";
import React from 'react';
import './Itinerario.css';
import { useAnimations } from "@/hooks/useAnimations";

// Importamos los que sí están en fa6
import { 
  FaChurch, 
  FaCrown, 
  FaMusic, 
  FaMoon 
} from "react-icons/fa6";

// Importamos el brindis desde 'fa' (v5) que es donde reside ese nombre exacto
import { FaGlassCheers } from "react-icons/fa"; 
import { MdOutlineFastfood } from "react-icons/md";

const eventosXV = [
  { 
    time: "05:00 PM", 
    title: "Misa de Acción de Gracias", 
    icon: <FaChurch />, 
    desc: "Templo de la Expiación" 
  },
  { 
    time: "08:00 PM", 
    title: "Entrada Triunfal", 
    icon: <FaCrown />, 
    desc: "Recepción en el Salón" 
  },
  { 
    time: "09:00 PM", 
    title: "El Vals de la Quinceañera", 
    icon: <FaMusic />, 
    desc: "Momento mágico con mis chambelanes" 
  },
  { 
    time: "10:00 PM", 
    title: "Cena de Gala", 
    icon: <MdOutlineFastfood />, 
    desc: "Banquete especial" 
  },
  { 
    time: "10:30 PM", 
    title: "Brindis y Pastel", 
    icon: <FaGlassCheers />, 
    desc: "Palabras de mis padres" 
  },
  { 
    time: "02:00 AM", 
    title: "Fin de la Fiesta", 
    icon: <FaMoon />, 
    desc: "¡Gracias por acompañarme!" 
  }
];

export default function Itinerario() {
  useAnimations();

  return (
    <section className="itinerario-section" id='itinerario'>
      <div className="section-header">
        <span className="section-subtitle">MY SWEET FIFTEEN</span>
        <h2 className="section-title">Itinerario</h2>
        <div className="section-divider"></div>
      </div>

      <div className="itinerario-container">
        <div className="itinerario-line-bg"></div>
        <div className="itinerario-line-progress"></div>

        {eventosXV.map((item, index) => (
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