"use client";
import { motion } from "framer-motion";
import './Presentacion.css';

export default function Presentacion() {
  return (
    <section className="presentacion-section">
      <div className="presentacion-container">
        
        {/* CORONA PNG FLOTANDO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="corona-wrapper"
        >
          <img src="/princesa/optimized/corona.webp" alt="Corona Real" className="corona-flotante" />
        </motion.div>

        {/* TEXTO DE PRESENTACIÓN ANIMADO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="texto-container"
        >
          <span className="prefacio">UN SUEÑO HECHO REALIDAD</span>
          
          <div className="mensaje-principal">
            <p className="cita-inicial">
              “Hay momentos que se graban en el corazón para siempre, 
              y este es uno de ellos.”
            </p>
            
            <div className="linea-central"></div>
            
            <p className="texto-emocional">
              Hoy dejo atrás mis primeros pasos para comenzar un nuevo camino. 
              Me llena de felicidad saber que cuento contigo para ser testigo de 
              esta noche mágica donde los sueños dejan de serlo para convertirse 
              en recuerdos inolvidables.
            </p>

          </div>
        </motion.div>
      </div>

      {/* Decoración de luz de fondo sutil */}
      <div className="luz-fondo"></div>
    </section>
  );
}