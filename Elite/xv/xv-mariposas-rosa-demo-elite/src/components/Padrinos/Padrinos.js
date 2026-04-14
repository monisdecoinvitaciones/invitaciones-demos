"use client";
import { useState, useEffect, useCallback } from "react";
import './Padrinos.css';

export default function Padrinos() {
  const [slides] = useState([
    { id: 1, icono: "/IconosCianNegro/1.png", titulo: "ANILLOS", nombres: ["Rogelio Martínez Loredo", "Ana Salazar Montes"] },
    { id: 2, icono: "/IconosCianNegro/2.png", titulo: "BIBLIA", nombres: ["Nombre Padrino", "Nombre Madrina"] },
    { id: 3, icono: "/IconosCianNegro/41.png", titulo: "ARRAS", nombres: ["Nombre Padrino", "Nombre Madrina"] },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const moverSiguiente = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const moverAnterior = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const intervalo = setInterval(moverSiguiente, 7000);
    return () => clearInterval(intervalo);
  }, [moverSiguiente]);

  return (
    <section className="padrinos-section" id="padrinos">
      <h2 className="titulo-padrinos txt-huge">NUESTROS PADRINOS</h2>

      <div className="slider-container">
        <button className="flecha izquierda" onClick={moverAnterior}>
          &#10094;
        </button>

        <div className="slider-window">
          <div
            className="slides-wrapper"
            style={{
              transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
              transition: "transform 0.5s ease-in-out",
              width: `${slides.length * 100}%`
             
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="slide">
                <div className="icono font-bodyColor txt-medium">
                  <img src={slide.icono} alt={slide.titulo} />
                </div>
                <h3 className="font-bodyColor txt-medium">{slide.titulo}</h3>
                {slide.nombres.map((n, i) => (
                  <p className="txt-medium" key={i}>{n}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button className="flecha derecha" onClick={moverSiguiente}>
          &#10095;
        </button>
      </div>

      <div className="indicadores">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={i === currentIndex ? "activo" : ""}
          />
        ))}
      </div>
    </section>
  );
}


