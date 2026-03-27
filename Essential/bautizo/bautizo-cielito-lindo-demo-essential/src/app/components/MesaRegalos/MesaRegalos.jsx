"use client";

import { useEffect } from 'react';
import './MesaRegalos.css';

export default function MesaRegalos() {
  useEffect(() => {
    const card = document.querySelector(".flip-card-invimon");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (card) observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="regalos-seccion-invimon" id="regalos">
      
      <div className="regalos-header-invimon">
        {/* FLORECITA COMO ICONO SUPERIOR */}
        <div className="flower-icon-divider">
          <img src="/fotos/flor.png" alt="Icono Decorativo" className="mini-flower-invimon" />
        </div>
        
        <span className="regalos-subtitle-invimon text-white">Un Detalle Especial</span>
        <h2 className="regalos-titulo-invimon text-white">Mesa de Regalos</h2>
        <div className="divider-elegante"></div>
      </div>
      
      <div className="regalos-contenedor-invimon">
        <div className="flip-card-invimon">
          <div className="flip-card-inner-invimon">
            
            {/* FRENTE */}
            <div className="flip-card-front-invimon">
              <img 
                src="/fotos/logoLiverpool.png" 
                alt="Liverpool Logo" 
                className="logo-liverpool-invimon" 
              />
              <div className="indicador-interaccion">
                <span className="toque-text-invimon">Toca para ver detalles</span>
                <div className="toque-linea"></div>
              </div>
            </div>

            {/* ATRÁS */}
            <div className="flip-card-back-invimon">
              {/* FLORECITA COMO SELLO EN LA TARJETA */}
              <img src="/fotos/flor.png" alt="Sello" className="card-stamp-flower" />
              
              <h3 className="back-title-invimon">Liverpool</h3>
              <p className="back-info-invimon">
                La mesa de regalos está <br/>
                disponible bajo el número:
              </p>
              <div className="evento-number-invimon">12345678</div>
              
              <a 
                href="https://mesaderegalos.liverpool.com.mx/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-regalo-invimon"
              >
                VISITAR MESA
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}