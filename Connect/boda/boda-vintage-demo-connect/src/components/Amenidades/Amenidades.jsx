"use client";
import { useState } from "react";
import Image from "next/image";
import './Amenidades.css';

export default function Amenidades() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const listaAmenidades = [
    {
      titulo: "ESTACIONAMIENTO",
      contenido: "El recinto cuenta con estacionamiento privado y servicio de Valet Parking sin costo para nuestros invitados."
    },
    {
      titulo: "MENÚ INFANTIL",
      contenido: "Contaremos con opciones especiales para los más pequeños. Por favor, infórmanos en tu RSVP si requieres este servicio."
    },
    {
      titulo: "HOSPEDAJE",
      contenido: "Tenemos un convenio con los hoteles de la sección Hospedaje. Menciona el código 'Boda KarinayUlises' al hacer tu reserva para obtener una tarifa preferencial."
    },
    {
      titulo: "RESTRICCIONES ALIMENTARIAS",
      contenido: "Si eres alérgico a algún alimento o tienes una dieta específica (vegana/celíaca), nuestro equipo de catering estará listo para atenderte."
    }
  ];

  return (
    <section className="amenidades-section">
      {/* Decoraciones de fondo con prioridad baja para no trabar el render */}
      <div className="papel-decor-tr">
        <Image 
          src="/icons/flores/optimized/papel.webp" 
          alt="" width={250} height={250} loading="lazy"
        />
      </div>
      <div className="papel-decor-bl">
        <Image 
          src="/icons/flores/optimized/papel.webp" 
          alt="" width={250} height={250} loading="lazy"
        />
      </div>

      <div className="amenidades-container">
        <h2 className="amenidades-title">Amenidades</h2>
        <div className="amenidades-divider"></div>

        <div className="accordion-wrapper">
          {listaAmenidades.map((item, index) => (
            <div 
              key={index} 
              className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="accordion-header">
                <span>{item.titulo}</span>
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              
              <div className="accordion-content">
                <div className="content-inner">
                  <p>{item.contenido}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}