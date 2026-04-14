"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DatosFiesta.module.css";

// Sub-componente interno para no repetir lógica y mantener tus clases intactas
function BloqueInformacion({ children }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`${styles.bloque} ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
}

export default function DatosFiesta() {
  return (
    <section className={styles.section} id="datos">
      
      {/* CEREMONIA FRENTE AL MAR */}
      <BloqueInformacion>
        <h2 className={`${styles.tituloScript} text-white`}>Ceremonia Frente al Mar</h2>
        <p className={`${styles.hora} txt-medium text-white`}>5:00 PM</p>

        <div className={styles.icono}>
          <img src="/icons/ceremoniaBlanca.png" alt="icono ceremonia" />
        </div>

        <h3 className={`${styles.lugar} text-white`}>
          Playa Brisa Dorada
        </h3>

        <p className={`${styles.direccion} txt-medium text-white`}>
          Carretera Costera km 12,
          23450 Costa Esmeralda, MX.
        </p>

        <button className={`${styles.btnUbicacion} text-white`}>
          VER UBICACIÓN
        </button>
      </BloqueInformacion>

      <div className={styles.decorador}></div>

      {/* CÓCTEL AL ATARDECER */}
      <BloqueInformacion>
        <h2 className={`${styles.tituloScript} text-white`}>Cóctel al Atardecer</h2>
        <p className={`${styles.hora} txt-medium text-white`}>6:30 PM</p>

        <div className={styles.icono}>
          <img src="/icons/icon-sun.png" alt="icono atardecer" />
        </div>

        <h3 className={`${styles.lugar} text-white`}>
          Terraza Coral Sunset
        </h3>

        <p className={`${styles.direccion} txt-medium text-white`}>
          Paseo del Mar 88,
          23450 Costa Esmeralda, MX.
        </p>

        <button className={`${styles.btnUbicacion} text-white`}>
          VER UBICACIÓN
        </button>
      </BloqueInformacion>

      <div className={styles.decorador}></div>

      {/* CENA Y FIESTA */}
      <BloqueInformacion>
        <h2 className={`${styles.tituloScript} text-white`}>
          Cena y Fiesta Bajo las Estrellas
        </h2>

        <p className={`${styles.hora} txt-medium text-white`}>8:30 PM</p>

        <p className={`${styles.descripcion} txt-medium text-white`}>
          Celebremos juntos con el sonido del mar, luces cálidas y una noche inolvidable.
        </p>

        <div className={styles.icono}>
          <img src="/icons/copasBlancas.png" alt="icono fiesta" />
        </div>

        <h3 className={`${styles.lugar} text-white`}>
          Beach Club Perla Azul
        </h3>

        <p className={`${styles.direccion} txt-medium text-white`}>
          Blvd. Oceánico 250,
          23450 Costa Esmeralda, MX.
        </p>

        <button className={`${styles.btnUbicacion} text-white`}>
          VER UBICACIÓN
        </button>
      </BloqueInformacion>
      
    </section>
  );
}