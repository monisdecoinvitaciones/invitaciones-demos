"use client";
import React, { useEffect, useRef, useState } from 'react';
import './GiftRegistry.css';

// Componente individual para cada tarjeta de regalo con su propio Observer
const GiftCard = ({ children, animClass }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsCardVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`gift-card ${animClass} ${isCardVisible ? 'reveal-card' : ''}`}
    >
      {children}
    </div>
  );
};

const GiftRegistry = () => {
  const [showModal, setShowModal] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.5 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("¡Copiado al portapapeles!"); 
  };

  return (
    <section className="gift-section">
      <div className="gift-bg-wrapper">
        <img src="/fondos/fondoMesa.jpg" alt="Fondo" className="gift-bg-img" />
        <div className="gift-bg-overlay"></div>
      </div>

      <div className="gift-content-relative">
        <div 
          ref={headerRef} 
          className={`gift-header ${headerVisible ? 'reveal' : ''}`}
        >
          <h2 className="gift-title">Mesa de Regalos</h2>
          <p className="gift-subtitle">Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros:</p>
        </div>

        <div className="gift-grid">
          {/* TARJETA 1 - ENTRA POR LA IZQUIERDA */}
          <GiftCard animClass="anim-side-left">
            <div className="gift-icon-wrapper">
              <img src="/icons/16.png" alt="Regalo" className="gift-icon" />
            </div>
            <h3 className="gift-store-name">Amazon</h3>
            <p className="gift-text">Puedes encontrar nuestra lista de deseos directamente aquí:</p>
            <a href="#" target="_blank" className="gift-btn">VER MESA</a>
          </GiftCard>

          {/* TARJETA 2 - ENTRA POR LA DERECHA */}
          <GiftCard animClass="anim-side-right">
            <div className="gift-icon-wrapper">
              <img src="/icons/17.png" alt="Sobre" className="gift-icon" />
            </div>
            <h3 className="gift-store-name">Lluvia de Sobres</h3>
            <p className="gift-text">Si prefieres, contaremos con un cofre para sobres el día del evento.</p>
            <button className="gift-btn-info" onClick={() => setShowModal(true)}>
              DATOS BANCARIOS
            </button>
          </GiftCard>
        </div>
      </div>

      {/* --- MODAL DE DATOS BANCARIOS --- */}
      {showModal && (
        <div className="gift-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="gift-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gift-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="gift-modal-title">Datos Bancarios</h3>
            <div className="gift-modal-data">
              <div className="data-item">
                <span>BANCO</span>
                <p>BBVA</p>
              </div>
              <div className="data-item">
                <span>TITULAR</span>
                <p>Camila & Alejandro</p>
              </div>
              <div className="data-item" onClick={() => copyToClipboard("1234567890123456")}>
                <span>CLABE (Click para copiar)</span>
                <p className="clabe-text">1234 5678 9012 3456</p>
              </div>
            </div>
            <p className="gift-modal-thanks">¡Muchas gracias!</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftRegistry;