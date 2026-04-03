"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './SaveTheDate.css';

export default function SaveTheDate() {
  const sectionRef = useRef(null);
  const [appleLink, setAppleLink] = useState("");
  const [offset, setOffset] = useState(0);

  const config = {
    titulo: "Boda de Karina y Ulises",
    inicio: "20270222T180000", 
    fin: "20270223T020000",
    lugar: "Hacienda Loma de la Cruz Km. 15 Carr. a Zapotlanejo, GDL.",
    detalles: "¡Te esperamos para celebrar juntos nuestro gran día!"
  };

  useEffect(() => {
    // Generación de iCal
    const icalContent = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      `DTSTART:${config.inicio}`, `DTEND:${config.fin}`,
      `SUMMARY:${config.titulo}`, `DESCRIPTION:${config.detalles}`,
      `LOCATION:${config.lugar}`, 'END:VEVENT', 'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    setAppleLink(URL.createObjectURL(blob));

    // Scroll para Parallax
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        setOffset(top);
      }
    };

    // Intersection Observer para visibilidad
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxValue = offset * 0.1;

  return (
    <section className="std-minimal" ref={sectionRef}>
      {/* Flor Decorativa 1 */}
      <div 
        className="std-flor-1"
        style={{ transform: `translateY(${parallaxValue * 0.4}px) rotate(-15deg)` }}
      >
        <Image 
          src="/icons/flores/optimized/flor.webp" 
          alt="Decoración floral"
          width={400} 
          height={400}
          priority
          className="img-responsive-flor"
        />
      </div>

      {/* Flor Decorativa 2 */}
      <div 
        className="std-flor-2"
        style={{ transform: `translateY(${parallaxValue * -0.4}px) rotate(160deg) scaleX(-1)` }}
      >
        <Image 
          src="/icons/flores/optimized/flor.webp" 
          alt="Decoración floral"
          width={450} 
          height={450}
          priority
          className="img-responsive-flor"
        />
      </div>

      <div className="std-content">
        {/* ICONO FLOTANTE CENTRAL */}
        <div className="std-icon-wrapper">
          <Image 
            src="/icons/flores/optimized/flor.webp" 
            alt="Icono central"
            fill
            className="std-png-icon"
            priority
          />
        </div>

        <h2 className="std-title">Save the Date</h2>
        <p className="std-date">24.07.27</p>
        
        <div className="std-links">
          <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(config.titulo)}&dates=${config.inicio}/${config.fin}`} 
             target="_blank" rel="noopener noreferrer">
            + Google Calendar
          </a>
          {appleLink && (
            <a href={appleLink} download="evento.ics">
              + Apple iCal
            </a>
          )}
        </div>
      </div>
    </section>
  );
}