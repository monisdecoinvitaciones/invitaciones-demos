"use client";
import React from "react";
import "./BotonInicio.css";

const BotonInicio = () => {
  return (
    <div className="contenedor-regresar">
      <a href="#inicio" className="enlace-regresar-inicio">
        <div className="flecha-inicio">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        <span>Volver al inicio</span>
      </a>
    </div>
  );
};

export default BotonInicio;