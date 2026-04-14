'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Hospedaje.css';

const Hospedaje = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hoteles = [
    {
      id: 1,
      nombre: "Hotel Rosa Grand",
      // Imagen de hotel boutique elegante en tonos cálidos
      imagen: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop", 
      distancia: "A 5 minutos del evento",
      link: "https://goo.gl/maps/ejemplo1",
      promo: "Código: BODA-KARINA"
    },
    {
      id: 2,
      nombre: "Palacio de Cristal",
      // Imagen de habitación de lujo con detalles rosados/neutros
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
      distancia: "A 10 minutos del evento",
      link: "https://goo.gl/maps/ejemplo2",
      promo: "Tarifa preferencial"
    }
  ];

  return (
    <section className="hospedaje-section" ref={sectionRef} id='hospedaje'>
      <div className={`hospedaje-container ${isVisible ? 'fade-up' : ''}`}>
        <img src="/iconosRosaPalo/19.png" alt="Hospedaje" className="hospedaje-icon" />
        
        <h2 className="hospedaje-title">Hospedaje</h2>
        <p className="hospedaje-subtitle">Para tu mayor comodidad, te recomendamos las siguientes opciones:</p>

        <div className="hoteles-grid">
          {hoteles.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-image-wrapper">
                <img src={hotel.imagen} alt={hotel.nombre} className="hotel-img" />
                <div className="hotel-overlay"></div>
              </div>
              <div className="hotel-info-content">
                <h3 className="hotel-name">{hotel.nombre}</h3>
                <p className="hotel-distance">{hotel.distancia}</p>
                <div className="hotel-promo-tag">{hotel.promo}</div>
                <a 
                  href={hotel.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hotel-btn"
                >
                  VER UBICACIÓN
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hospedaje;