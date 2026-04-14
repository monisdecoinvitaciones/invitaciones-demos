"use client";
import { useState } from "react";
import './NavBar.css';

export default function NavbarInvitacion() {
  const [isOpen, setIsOpen] = useState(false);

  const secciones = [
    { id: "inicio", label: "INICIO" },
    { id: "galeria", label: "GALERIA" },
    { id: "itinerario", label: "ITINERARIO" },
    { id: "datos", label: "UBICACIONES" },
    { id: "regalos", label: "REGALOS" },
    { id: "hospedaje", label: "HOSPEDAJE" },
    { id: "rsvp", label: "CONFIRMAR" }
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Cierra el sidebar al hacer click
  };

  return (
    <>
      {/* NAVBAR PC: Solo links y centrados */}
      <nav className="nav-invitacion">
        <div className="nav-links">
          {secciones.map((sec) => (
            <button key={sec.id} onClick={() => scrollToSection(sec.id)}>
              {sec.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ELEMENTOS MÓVIL: Botón flotante + Sidebar */}
      <div className="mobile-menu-wrapper">
        {/* Capa oscura de fondo */}
        <div 
          className={`nav-overlay ${isOpen ? "active" : ""}`} 
          onClick={() => setIsOpen(false)} 
        />

        {/* Sidebar Lateral */}
        <div className={`sidebar-movil ${isOpen ? "open" : ""}`}>
          <div className="sidebar-header">MENÚ</div>
          {secciones.map((sec) => (
            <button key={sec.id} onClick={() => scrollToSection(sec.id)}>
              {sec.label}
            </button>
          ))}
        </div>

        {/* Botón Flotante */}
        <button className="boton-flotante" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </>
  );
}