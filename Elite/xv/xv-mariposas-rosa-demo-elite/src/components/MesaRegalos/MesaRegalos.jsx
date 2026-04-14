"use client";
import React, { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import './MesaRegalos.css';

const MesaRegalos = () => {
  const [copied, setCopied] = useState(false);
  const clabe = "123456789012345678"; // Reemplaza con la clabe real

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clabe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="gift-section" id='regalos'>
      <div className="gift-content">
        
        {/* Contenedor del título con mariposas flotantes */}
        <div className="gift-header-container">
          <img src="/mariposas/5.png" alt="mariposa" className="butterfly-floating left" />
          <h2 className="gift-title">Mesa de regalos</h2>
          <img src="/mariposas/5.png" alt="mariposa" className="butterfly-floating right" />
        </div>

        <p className="gift-intro">
          Tu compañía es mi regalo favorito, pero si deseas tener un detalle conmigo:
        </p>

        <div className="envelope-wrapper">
          {/* SOBRE 1: TRANSFERENCIA */}
          <div className="envelope-card deep-pink">
            <div className="envelope-tag">Sugerencia</div>
            <div className="custom-icon-wrapper">
              <img src="/iconosBlancos/38.png" alt="Icono Transferencia" className="custom-png-icon" />
            </div>
            <h3>Transferencia</h3>
            <p>Si prefieres realizar un presente vía transferencia bancaria:</p>
            <div className="bank-details" onClick={copyToClipboard}>
              <span className="clabe-num">{clabe}</span>
              {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
              <div className={`toast ${copied ? 'visible' : ''}`}>¡Copiado!</div>
            </div>
            <span className="bank-info">BBVA • A nombre de: María García</span>
          </div>

          {/* SOBRE 2: LIVERPOOL */}
          <div className="envelope-card medium-pink">
            <div className="envelope-tag">Mesa Online</div>
            <div className="custom-icon-wrapper">
              <img src="/icons/regalo.png" alt="Icono Regalo" className="custom-png-icon" />
            </div>
            <h3>Liverpool</h3>
            <p>He seleccionado algunas opciones que me encantan en esta tienda.</p>
            <a href="#" target="_blank" className="envelope-link">
              Ver Mesa <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MesaRegalos;