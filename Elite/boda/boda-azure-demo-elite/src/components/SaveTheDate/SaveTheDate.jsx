"use client";
import { useState, useEffect, useRef } from "react";
import './SaveTheDate.css';

export default function SaveTheDate() {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef(null);

  // Datos de la Boda para los calendarios
  const eventDetails = {
    title: "Nuestra Boda - Valentina y Julián",
    description: "Acompáñanos a celebrar nuestra unión.",
    location: "Playa Brisa Dorada, Costa Esmeralda, MX",
    startDate: "20270724T170000",
    endDate: "20270725T020000"
  };

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&dates=${eventDetails.startDate}/${eventDetails.endDate}`;
  const appleUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${eventDetails.startDate}%0ADTEND:${eventDetails.endDate}%0ASUMMARY:${encodeURIComponent(eventDetails.title)}%0ADESCRIPTION:${encodeURIComponent(eventDetails.description)}%0ALOCATION:${encodeURIComponent(eventDetails.location)}%0AEND:VEVENT%0AEND:VCALENDAR`;

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        if (top < window.innerHeight && top > -window.innerHeight) {
          setOffsetY(top * 0.15);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="save-date-section">
      {/* Fondo de Talavera con Parallax (Igual al contador) */}
      <div 
        className="save-date-parallax-bg" 
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      ></div>

      <div className="save-date-overlay">
        <span className="save-date-pretitle">AGREGA EL EVENTO</span>
        
        <h2 className="save-date-title">Save the Date</h2>
        
        <div className="save-date-divider">
          <span className="line"></span>
          <span className="date-text">24 . 07 . 2027</span>
          <span className="line"></span>
        </div>

        <div className="calendar-buttons-group">
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="btn-calendar">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
            Google Calendar
          </a>

          <a href={appleUrl} download="boda_karina_ulises.ics" className="btn-calendar">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.16 16.35 4.3 10.53 7.82 10.3c1.01.03 1.83.65 2.45.65.61 0 1.63-.74 2.87-.62 1.54.14 2.65.71 3.29 1.63-3.14 1.88-2.61 6.13.52 7.4-.6 1.52-1.39 3.01-2.43 4.25zM12.03 10.22c-.08-2.31 1.89-4.32 4.16-4.48.24 2.27-2.18 4.41-4.16 4.48z"/></svg>
            Apple Calendar
          </a>
        </div>

        <p className="save-date-footer">
          Nos encantaría que nos acompañes. Agenda la fecha para que celebremos juntos este gran comienzo.
        </p>
      </div>
    </section>
  );
}