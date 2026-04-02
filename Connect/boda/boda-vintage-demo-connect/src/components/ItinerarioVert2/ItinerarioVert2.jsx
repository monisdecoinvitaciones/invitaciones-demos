import React, { useEffect } from 'react';
import './ItinerarioVert2.css';

const ItinerarioVert2 = () => {
  useEffect(() => {
    const elementos = document.querySelectorAll('.iti-evento');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('iti-visible');
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const eventos = [
  { 
    id: 1, 
    titulo: "CEREMONIA FRENTE AL MAR", 
    hora: "5:00 PM", 
    icono: "/icons/itinerario-ceremoniaN.png" 
  },
  { 
    id: 2, 
    titulo: "CÓCTEL AL ATARDECER", 
    hora: "6:30 PM", 
    icono: "/icons/black-sun.png" 
  },
  { 
    id: 3, 
    titulo: "CENA Y FIESTA", 
    hora: "8:30 PM", 
    icono: "/icons/itinerario-coctel.png" 
  },
  { 
    id: 4, 
    titulo: "BAILE Y CELEBRACIÓN", 
    hora: "10:30 PM", // Estimado basado en el flujo
    icono: "/icons/itinerario-baileN.png" 
  },
  { 
    id: 5, 
    titulo: "FIN DE LA CELEBRACIÓN", 
    hora: "2:00 AM", // Estimado
    icono: "/icons/itinerario-finN.png" 
  }
];

  return (
    <section className="iti-section-wrapper" id='itinerario'>
      <h1 className="iti-main-title">ITINERARIO</h1>
      
      <div className="iti-timeline-container">
        {eventos.map((ev, index) => (
          <div key={ev.id} className="iti-evento">
            <div className="iti-col-left">
              <img src={ev.icono} alt={ev.titulo} className="iti-icon-img" />
            </div>
            
            <div className="iti-col-center">
              {/* Solo mostramos la flecha si NO es el último elemento */}
              {index !== eventos.length-1&& (
                <div className="iti-arrow-spacer">
                  <img src="/icons/img-flecha.png" alt="v" className="iti-arrow-img" />
                </div>
              )}
            </div>

            <div className="iti-col-right">
              <div className="iti-text-container">
                <h2 className="iti-event-title font-body txt-medium">{ev.titulo}</h2>
                <p className="iti-event-time txt-medium">{ev.hora}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ItinerarioVert2;