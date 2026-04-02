"use client";
import { useState } from "react";
import Image from "next/image"; // Importante para optimización
import { IoChevronDownOutline } from "react-icons/io5"; // Icono simple y elegante
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
      contenido: "Tenemos un convenio con los hoeteles de la seccón Hospedaje. Menciona el código 'Boda KarinayUlises' al hacer tu reserva para obtener una tarifa preferencial."
    },
    {
      titulo: "RESTRICCIONES ALIMENTARIAS",
      contenido: "Si eres alérgico a algún alimento o tienes una dieta específica (vegana/celíaca), nuestro equipo de catering estará listo para atenderte."
    }
  ];

  return (
    <section className="amenidades-section">
      {/* Decoración de Papel Rasgado - Esquina Superior Derecha */}
      <div className="papel-decor-tr">
        <Image 
          src="/icons/papel.png" 
          alt="Decoración de papel"
          width={350} 
          height={350}
          priority
        />
      </div>

      {/* Decoración de Papel Rasgado - Esquina Inferior Izquierda */}
      <div className="papel-decor-bl">
        <Image 
          src="/icons/papel.png" 
          alt="Decoración de papel"
          width={400} 
          height={400}
          priority
        />
      </div>

      <div className="amenidades-container">
        <h2 className="amenidades-title">Amenidades & Detalles</h2>
        <div className="amenidades-divider"></div>

        <div className="accordion-wrapper">
          {listaAmenidades.map((item, index) => (
            <div 
              key={index} 
              className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.titulo}</span>
                <IoChevronDownOutline className="chevron-icon" />
              </button>
              
              <div 
                className="accordion-content"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0px",
                }}
              >
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