"use client";
import { useEffect, useRef } from "react";
import "./DatosEventoLuxury.css";

export default function DatosEventoLuxury() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="evento-luxury">

      {/* MISA <h2>Misa</h2>*/}
      <div
        className="luxury-item animar" id="datos"
        ref={(el) => (itemsRef.current[0] = el)}
      >
        <div className="luxury-card">
          <div className="luxury-texto">
            <span className="luxury-label">Ceremonia</span>
            
            <p className="lugar">Iglesia San Juan Bautista</p>
            <p className="direccion">
              Calle Independencia #123, Col. Centro
            </p>
            <p className="hora">4:00 PM</p>
            <a href="#" className="luxury-btn">
              VER UBICACIÓN
            </a>
          </div>

          <div className="luxury-img">
            <img src="/icons/ceremoniaa.jpg" alt="Misa" />
          </div>
        </div>
      </div>

      {/* RECEPCIÓN */}
      <div
        className="luxury-item animar"
        ref={(el) => (itemsRef.current[1] = el)}
      >
        <div className="luxury-card reverse">
          <div className="luxury-texto">
            <span className="luxury-label">Celebración</span>
            {/* RECEPCIÓN <h2>Recepción</h2>*/}
            
            <p className="lugar">Salón Los Olivos</p>
            <p className="direccion">
              Av. de los Laureles #45, Tonalá, Jalisco
            </p>
            <p className="hora">6:00 PM</p>
            <a href="#" className="luxury-btn">
              VER UBICACIÓN
            </a>
          </div>

          <div className="luxury-img">
            <img src="/icons/salon.jpg" alt="Recepción" />
          </div>
        </div>
      </div>

    </section>
  );
}
