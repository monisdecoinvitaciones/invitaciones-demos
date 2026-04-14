"use client";
import { useEffect } from "react";

export function useAnimations() {
  useEffect(() => {
    /* --- SELECTORES --- */
    const selectores = `
      .frase, .dia-semana, .fecha-texto, .countdown-elegante, 
      .animar, .evento, .hotel-card, .vestimenta-contenido, 
      .flip-card, .adultos-contenido, .frase-romantica, 
      .galeria-item, .itinerario-row, .lado, .regalos-container
    `;

    const elementosAnimados = document.querySelectorAll(selectores);
    const itinerarioContainer = document.querySelector(".itinerario-container");
    const rows = document.querySelectorAll(".itinerario-row");
    const lineaProgreso = document.querySelector(".itinerario-line-progress");
    const fechaSection = document.querySelector(".fecha-section");
    const isMobile = window.innerWidth < 768;

    /* --- INTERSECTION OBSERVER --- */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Detectamos si es Galería o Regalos
          const esExcepcion = 
            entry.target.classList.contains("galeria-item") || 
            entry.target.classList.contains("regalos-container") ||
            entry.target.closest(".galeria-section") || 
            entry.target.closest(".regalos-section");

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            
            // Si es excepción, dejamos de observarlo para que se quede fijo
            if (esExcepcion) {
              observer.unobserve(entry.target);
            }
          } else {
            // Si NO es excepción, aplicamos el efecto bidireccional (remover clase)
            if (!esExcepcion) {
              entry.target.classList.remove("visible");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    elementosAnimados.forEach((el) => observer.observe(el));

    /* --- SCROLL LOGIC (RAILWAY EFFECT) --- */
    let ticking = false;

    const manejarScroll = () => {
      const windowHeight = window.innerHeight;

      /* ITINERARIO DINÁMICO (Bidireccional por defecto) */
      if (itinerarioContainer && lineaProgreso) {
        const rectCont = itinerarioContainer.getBoundingClientRect();
        const puntoActivacion = windowHeight * 0.7;
        const distanciaRecorrida = puntoActivacion - rectCont.top;
        const progresoActual = distanciaRecorrida / rectCont.height;
        const porcentaje = Math.min(Math.max(progresoActual * 100, 0), 100);

        lineaProgreso.style.height = `${porcentaje}%`;

        rows.forEach((row) => {
          const posicionFila = (row.offsetTop / itinerarioContainer.offsetHeight) * 100;
          if (porcentaje >= posicionFila - 5) {
            row.classList.add("visible");
          } else {
            row.classList.remove("visible"); // El itinerario sigue siendo bidireccional
          }
        });
      }

      /* ZOOM FECHA */
      if (fechaSection && !isMobile) {
        const rectFecha = fechaSection.getBoundingClientRect();
        if (rectFecha.top < windowHeight && rectFecha.bottom > 0) {
          const progresoZoom = (windowHeight - rectFecha.top) / (windowHeight + fechaSection.offsetHeight);
          const escala = 1 + progresoZoom * 0.2;
          fechaSection.style.setProperty("--zoom", escala);
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          manejarScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    manejarScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
}