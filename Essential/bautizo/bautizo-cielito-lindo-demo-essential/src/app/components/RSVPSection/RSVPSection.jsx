'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { FaWhatsapp } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import './RSVPSection.css';

const RSVPSection = () => {
  const [ref, isVisible] = useReveal();

  const handleWhatsapp = () => {
    const phone = "523322283707"; // Tu número aquí
    const message = encodeURIComponent("¡Hola! Me interesan sus invitaciones web paquete essential");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="rsvp-section">
      
      <div 
        ref={ref}
        className={`rsvp-container ${isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="rsvp-card">
          <span className="rsvp-subtitle">¿Nos acompañas?</span>
          <h2 className="rsvp-title">Confirma tu Asistencia</h2>
          
          <p className="rsvp-text">
            Por favor, confirma tu asistencia 
            antes del<br></br> <strong>30 DE JUNIO</strong> para esperarte con mucha alegría.
          </p>

          <button onClick={handleWhatsapp} className="whatsapp-btn">
            <FaWhatsapp className="whatsapp-icon" />
            Confirmar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;