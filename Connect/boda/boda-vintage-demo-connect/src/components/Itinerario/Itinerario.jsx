"use client";
import { useAnimations } from "@/hooks/useAnimations"; 
import "./Itinerario.css";
import { LiaChurchSolid, LiaGlassMartiniAltSolid, LiaUtensilsSolid } from "react-icons/lia";
import { PiMusicNotesThin } from "react-icons/pi";

export default function Itinerario() {
  useAnimations();

  const eventos = [
   { 
  hora: "4:00 PM", 
  titulo: "CEREMONIA", 
  desc: (
    <>
      Templo de la Expiación <br /> 
      C. López Cotilla 935, Guadalajara.
    </>
  ), 
  icon: <LiaChurchSolid />, 
  side: "left" 
},
    { 
      hora: "5:30 PM", 
      titulo: "CÓCTEL", 
      desc: "Terraza de la Casa del Mayorazgo", 
      icon: <LiaGlassMartiniAltSolid />, 
      side: "right" 
    },
    { 
      hora: "7:00 PM", 
      titulo: "RECEPCIÓN", 
      desc: (
    <>
      Hacienda Loma de la Cru <br /> 
      Km. 15 Carr. a Zapotlanejo, GDL.
    </>
  ), 
      icon: <LiaUtensilsSolid />, 
      side: "left" 
    },
    { 
      hora: "9:00 PM", 
      titulo: "FIESTA", 
      desc: "Cava de Eventos, Salón Principal", 
      icon: <PiMusicNotesThin />, 
      side: "right" 
    },
  ];

  return (
    <section className="itinerario-section" id="itinerario">
      <h2 className="itinerario-title-main">Itinerario</h2>
      <div className="itinerario-container">
        {/* Líneas de progreso central */}
        <div className="itinerario-line-bg"></div>
        <div className="itinerario-line-progress"></div>

        {eventos.map((item, index) => (
          <div key={index} className={`itinerario-row ${item.side}`}>
            {/* Sección de la Hora */}
            <div className="itinerario-time">
              <span>{item.hora}</span>
            </div>

            {/* Sección del Contenido */}
            <div className="itinerario-content">
              <div className="itinerario-icon-circle">
                <div className="react-icon-wrapper">
                  {item.icon}
                </div>
              </div>
              <h4>{item.titulo}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}