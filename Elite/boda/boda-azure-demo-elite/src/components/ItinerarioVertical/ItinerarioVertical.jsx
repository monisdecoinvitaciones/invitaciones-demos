"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './ItinerarioVertical.module.css';
import { GiLovers, GiCakeSlice, GiMusicalNotes } from "react-icons/gi";
import { MdDinnerDining, MdCelebration } from "react-icons/md";
import { FaMusic, FaGlassCheers } from "react-icons/fa";

export default function ItinerarioVertical() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const momentos = [
    { hora: "4:00 PM", titulo: "CEREMONIA", desc: "Templo de San Francisco de Asís", tipo: "ceremonia" },
    { hora: "5:30 PM", titulo: "CÓCTEL", desc: "Rancho Las Puertas San Miguel", tipo: "coctel" },
    { hora: "7:00 PM", titulo: "CENA", desc: "Servicio formal de tres tiempos", tipo: "cena" },
    { hora: "8:30 PM", titulo: "PRIMER BAILE", desc: "Apertura de pista", tipo: "baile" },
    { hora: "9:30 PM", titulo: "PASTEL", desc: "Corte del pastel y brindis", tipo: "pastel" },
    { hora: "10:00 PM", titulo: "MÚSICA EN VIVO", desc: "Grupo sorpresa", tipo: "musica" },
    { hora: "12:00 AM", titulo: "GRAN FINAL", desc: "Despedida especial", tipo: "final" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Línea de progreso (Sigue reaccionando al scroll en ambas direcciones)
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = rect.height;
        const visiblePart = Math.max(0, (windowHeight / 2) - rect.top);
        const newProgress = Math.min(100, (visiblePart / totalHeight) * 100);
        setProgress(newProgress);
      }

      // 2. Entrada de filas (Solo hacia adelante)
      const rows = document.querySelectorAll(`.${styles.row}`);
      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Si el elemento entra en el 85% de la pantalla, se activa para siempre
        if (rect.top < windowHeight * 0.85) {
          row.classList.add(styles.rowVisible);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Chequeo inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderIcon = (tipo) => {
    switch (tipo) {
      case "ceremonia": return <GiLovers />;
      case "coctel": return <FaGlassCheers />;
      case "cena": return <MdDinnerDining />;
      case "baile": return <GiMusicalNotes />;
      case "pastel": return <GiCakeSlice />;
      case "musica": return <FaMusic />;
      case "final": return <MdCelebration />;
      default: return null;
    }
  };

  return (
    <section className={styles.section} id="itinerario" ref={sectionRef}>
      <h2 className="itinerario-title txt-huge">Itinerario</h2>
      <div className={styles.container}>
        <div className={styles.lineBg}></div>
        <div className={styles.lineProgress} style={{ height: `${progress}%` }}></div>

        {momentos.map((m, i) => (
          <div key={i} className={`${styles.row} ${i % 2 === 0 ? styles.rowPar : styles.rowImpar}`}>
            <div className={styles.colHora}>
              <span className={styles.horaTexto}>{m.hora}</span>
            </div>
            <div className={styles.colIcono}>
              <div className={styles.dotDecorativo}></div>
            </div>
            <div className={styles.colInfo}>
              <div className={styles.infoHeader}>
                <h3 className={`${styles.tituloMomento} font-body`}>{m.titulo}</h3>
                <div className={styles.iconoMomento}>{renderIcon(m.tipo)}</div>
              </div>
              <p className={`${styles.descMomento} txt-medium`}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}