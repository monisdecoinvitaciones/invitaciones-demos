"use client";
import React from 'react';
import './MesaRegalos.css';

const MesaRegalos = () => {
  return (
    <section className="mesa-section" id="regalos">
      {/* Contenedor principal con fondo de talavera sutil */}
      <div className="talavera-overlay"></div>

      <div className="mesa-container">
        {/* LA TARJETA VERDE ASIMÉTRICA (ESTILO REFERENCIA) */}
        <div className="mesa-card">
          
          <header className="mesa-header">
            <h2 className="mesa-title">Mesa de Regalos</h2>
            <p className="mesa-intro">
              Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros, te dejamos algunas opciones:
            </p>
          </header>

          <div className="mesa-content">
            
            {/* OPCIÓN 1: TRANSFERENCIA (ESTILO REFERENCIA) */}
            <div className="mesa-opcion transfer">
              <h3 className="bank-name">SANTANDER</h3>
              <div className="mesa-divider"></div>
              
              {/* Espacio para icono de la persona */}
              <div className="person-icon-box">
                {/* Puedes poner un SVG o icono de fontawesome aquí */}
                ✉
              </div>
              
              <p className="person-name">Valentina</p>
              <p className="account-data">
                Número de cuenta: **** **** **70 <br />
                Cuenta CLABE: ************08
              </p>
            </div>

            {/* OPCIÓN 2: BOTONES (ESTILO REFERENCIA) */}
            <div className="mesa-opcion buttons">
              
              {/* Espacio para icono floral decorativo */}
              <div className="floral-divider-icon">
                {/* Pega aquí el SVG floral si lo tienes, o un carácter especial */}
                ✤
              </div>

              <div className="buttons-group">
                <a href="#" target="_blank" rel="noreferrer" className="mesa-btn-fancy">
                  <span>AMAZON</span>
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="mesa-btn-fancy">
                  <span>LIVERPOOL</span>
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="mesa-btn-fancy">
                  <span>PALACIO DE HIERRO</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MesaRegalos;