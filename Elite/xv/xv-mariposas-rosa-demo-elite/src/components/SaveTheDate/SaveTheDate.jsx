"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import './SaveTheDate.css';

export default function SaveTheDate() {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  // Datos del evento para los calendarios
  const eventDetails = {
    title: "Mis XV Años - Valentina",
    description: "Acompáñame a celebrar este momento tan especial.",
    location: "Tu Salón de Eventos, Ciudad",
    startDate: "20261015T190000", // Formato: YYYYMMDDTHHMMSS
    endDate: "20261016T020000"
  };

  // Links de Calendario
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&dates=${eventDetails.startDate}/${eventDetails.endDate}`;
  
  // El link de iCal para iPhone se suele manejar descargando un archivo .ics
  // Aquí usamos un link directo que Apple Calendar suele reconocer
  const appleUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${eventDetails.startDate}%0ADTEND:${eventDetails.endDate}%0ASUMMARY:${encodeURIComponent(eventDetails.title)}%0ADESCRIPTION:${encodeURIComponent(eventDetails.description)}%0ALOCATION:${encodeURIComponent(eventDetails.location)}%0AEND:VEVENT%0AEND:VCALENDAR`;

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        setOffset(top);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxValue = offset * 0.1;

  return (
    <section ref={sectionRef} className="save-date-section">
      {/* Mariposa Decorativa 1 */}
      <div 
        className="save-date-decor-1"
        style={{ transform: `translateY(${parallaxValue * 0.4}px) rotate(-15deg)` }}
      >
        <Image 
          src="/mariposas/4.png" 
          alt="Decoración"
          width={400} 
          height={400}
          priority
          className="img-responsive-decor"
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>

      {/* Mariposa Decorativa 2 */}
      <div 
        className="save-date-decor-2"
        style={{ transform: `translateY(${parallaxValue * -0.4}px) rotate(160deg) scaleX(-1)` }}
      >
        <Image 
          src="/mariposas/4.png"  
          alt="Decoración"
          width={450} 
          height={450}
          priority
          className="img-responsive-decor"
        />
      </div>

      <div className="save-date-container">
        <span className="save-date-pretitle">AGREGA EL EVENTO</span>
        
        <h2 className="save-date-title">Save the Date</h2>
        <p className="save-date-subtitle">15 de Octubre de 2026</p>

        <div className="calendar-buttons-group">
          {/* Botón Google */}
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="btn-calendar">
            <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
            Google Calendar
          </a>

          {/* Botón Apple / iPhone */}
          <a href={appleUrl} download="evento.ics" className="btn-calendar">
            <svg viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.16 16.35 4.3 10.53 7.82 10.3c1.01.03 1.83.65 2.45.65.61 0 1.63-.74 2.87-.62 1.54.14 2.65.71 3.29 1.63-3.14 1.88-2.61 6.13.52 7.4-.6 1.52-1.39 3.01-2.43 4.25zM12.03 10.22c-.08-2.31 1.89-4.32 4.16-4.48.24 2.27-2.18 4.41-4.16 4.48z"/></svg>
            Apple Calendar
          </a>
        </div>

        <p className="save-date-footer">
          No olvides agendar la fecha para que no te pierdas ningún detalle de este gran día.
        </p>
      </div>
    </section>
  );
}