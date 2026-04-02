"use client";

import { useState } from "react";
import './MenuFlotante.css';

export default function MenuFlotante() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <div className={`menu-flotante ${open ? "open" : ""}`}>
        <button onClick={() => scrollToSection("inicio")}>Inicio</button>
        <button onClick={() => scrollToSection("fecha")}>Fecha</button>
        <button onClick={() => scrollToSection("padres")}>Padres</button>
        <button onClick={() => scrollToSection("padrinos")}>Padrinos</button>
        <button onClick={() => scrollToSection("itinerario")}>Itinerario</button>
        <button onClick={() => scrollToSection("datos")}>Ubicaciones</button>
        <button onClick={() => scrollToSection("galeria")}>Galería</button>
        <button onClick={() => scrollToSection("vestimenta")}>Vestimenta</button>
        <button onClick={() => scrollToSection("regalos")}>Regalos</button>
        <button onClick={() => scrollToSection("hospedaje")}>Hospedaje</button>
        <button onClick={() => scrollToSection("rsvp")}>Confirmar</button>
        <button onClick={() => scrollToSection("contacto")}>Contacto</button>
      </div>

      <button
        className="boton-menu"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
    </>
  );
}
