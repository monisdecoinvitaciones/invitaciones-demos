import React, { useEffect, useRef, useState } from 'react';
import './CodigoVestimenta2.css';

export default function CodigoVestimenta2() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el 20% de la sección es visible, activamos la animación
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="vestimenta-seccion-ed" id="vestimenta">
      <div 
        ref={sectionRef} 
        className={`vestimenta-container-ed ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="vestimenta-titulo-ed">DRESS CODE</h2>
        
        <div className="vestimenta-ilustracion-ed">
          {/* Asegúrate de que la ruta de tu imagen sea correcta */}
          <img src="/IconosCianNegro/11.png" alt="Ilustración Código de Vestimenta" />
        </div>

        <div className="vestimenta-info-ed">
          <h3 className="tipo-vestimenta-ed">Formal Playa</h3>
          
          <p className="descripcion-vestimenta-ed">
            "El mar y la brisa serán nuestros testigos. <br />
            Te sugerimos telas ligeras y colores claros para disfrutar al máximo."
          </p>

          <div className="detalle-items-ed">
            <span>Guayabera</span>
            <span className="separador-ed">|</span>
            <span>Vestido Largo</span>
          </div>
        </div>
      </div>
    </section>
  );
}