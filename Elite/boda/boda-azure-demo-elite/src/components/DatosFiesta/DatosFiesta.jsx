"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DatosFiesta.module.css";

function TarjetaUbicacion({ children, index }) {
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
      { threshold: 0.1 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`${styles.card} ${isVisible ? styles.visible : ""}`}
      style={{ transitionDelay: `${index * 0.2}s` }} // Crea el efecto cascada
    >
      {children}
    </div>
  );
}

export default function DatosFiesta() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="datos">
      <div className={styles.container}>
        
        <header 
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.visible : ""}`}
        >
          <h2 className={styles.mainTitle}>Dónde y Cuándo</h2>
          <div className={styles.titleDivider}></div>
        </header>

        <div className={styles.gridUbicaciones}>
          
          {/* CEREMONIA */}
          <TarjetaUbicacion index={0}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tituloScript}>Ceremonia</h3>
              <p className={styles.hora}>5:00 PM</p>
            </div>
            
            <div className={styles.iconoFloating}>
              <img src="/icons/ceremoniaBlanca.png" alt="Icono Ceremonia" />
            </div>

            <div className={styles.infoInfo}>
              <h4 className={styles.nombreLugar}>Playa Brisa Dorada</h4>
              <p className={styles.direccion}>
                Carretera Costera km 12, <br />
                23450 Costa Esmeralda, MX.
              </p>
            </div>

            <button className={styles.btnMaps}>VER UBICACIÓN</button>
          </TarjetaUbicacion>

          {/* CÓCTEL */}
          <TarjetaUbicacion index={1}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tituloScript}>Cóctel</h3>
              <p className={styles.hora}>6:30 PM</p>
            </div>
            
            <div className={styles.iconoFloating}>
              <img src="/icons/icon-sun.png" alt="Icono Cóctel" />
            </div>

            <div className={styles.infoInfo}>
              <h4 className={styles.nombreLugar}>Terraza Coral Sunset</h4>
              <p className={styles.direccion}>
                Paseo del Mar 88, <br />
                23450 Costa Esmeralda, MX.
              </p>
            </div>

            <button className={styles.btnMaps}>VER UBICACIÓN</button>
          </TarjetaUbicacion>

          {/* RECEPCIÓN */}
          <TarjetaUbicacion index={2}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tituloScript}>Recepción</h3>
              <p className={styles.hora}>8:30 PM</p>
            </div>
            
            <div className={styles.iconoFloating}>
              <img src="/icons/copasBlancas.png" alt="Icono Recepción" />
            </div>

            <div className={styles.infoInfo}>
              <h4 className={styles.nombreLugar}>Beach Club Perla Azul</h4>
              <p className={styles.direccion}>
                Blvd. Oceánico 250, <br />
                23450 Costa Esmeralda, MX.
              </p>
            </div>

            <button className={styles.btnMaps}>VER UBICACIÓN</button>
          </TarjetaUbicacion>

        </div>
      </div>
    </section>
  );
}