import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa'; 
import './ContactoNovios1.css';

const ContactoNovios1 = () => {
  const numeroTelefono = "523322283707";
  const mensajeBase = encodeURIComponent("Hola, me interesa una invitación web paquete connect plus");
  
  const seccionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Solo animar una vez
        }
      },
      { threshold: 0.2 } // Se activa cuando el 20% de la sección es visible
    );

    if (seccionRef.current) {
      observer.observe(seccionRef.current);
    }

    return () => {
      if (seccionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={seccionRef} 
      className={`contacto-seccion ${isVisible ? 'visible' : ''}`}
    >
      <h2 className="titulo-blanco">Contacto</h2>
      <p className="mensaje-intro-claro">Estamos a tu disposición para cualquier detalle</p>

      <div className="contacto-container">
        {/* Tarjeta Novia */}
        <div className="contacto-card">
          <span className="linea-decorativa"></span>
          <h3>Consultas Novia</h3>
          <p>Protocolo, mesa de regalos y código de vestimenta.</p>
          <a 
            href={`https://wa.me/${numeroTelefono}?text=${mensajeBase}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp"
          >
            <FaWhatsapp /> WHATSAPP
          </a>
        </div>

        {/* Tarjeta Novio */}
        <div className="contacto-card">
          <span className="linea-decorativa"></span>
          <h3>Consultas Novio</h3>
          <p>Ubicación, transporte y logística del evento.</p>
          <a 
            href={`https://wa.me/${numeroTelefono}?text=${mensajeBase}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp"
          >
            <FaWhatsapp /> WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactoNovios1;