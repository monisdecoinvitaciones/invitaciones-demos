"use client";
import { motion } from "framer-motion";
import { LuChurch } from "react-icons/lu"; 
import { GiGlassCelebration } from "react-icons/gi";
import './Ubicaciones.css';

export default function Ubicaciones() {
  
  // Variantes para el contenido (Texto e iconos)
  const fadeInVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Variantes para las hojas decorativas
  const leafLeftVariant = {
    hidden: { opacity: 0, x: -50, rotate: -10 },
    visible: { 
      opacity: 0.6, 
      x: 0, 
      rotate: 0,
      transition: { duration: 2, ease: "easeOut" } 
    }
  };

  const leafRightVariant = {
    hidden: { opacity: 0, x: 50, rotate: 10 },
    visible: { 
      opacity: 0.6, 
      x: 0, 
      rotate: 0, 
      transition: { duration: 2, ease: "easeOut" } 
    }
  };

  return (
    <section className="ubicaciones-container" id="datos">
      {/* PNG de Eucalipto - Animación de entrada suave desde la izquierda */}
      <motion.img 
        src="/princesa/optimized/eucalipto.webp" 
        className="eucalipto-decor top-left" 
        alt="" 
        variants={leafLeftVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      {/* PNG de Eucalipto - Animación de entrada suave desde la derecha */}
      <motion.img 
        src="/princesa/optimized/eucalipto.webp" 
        className="eucalipto-decor bottom-right" 
        alt="" 
        variants={leafRightVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ scaleX: -1, scaleY: -1 }} 
      />

      <div className="ubicaciones-wrapper">
        
        {/* SECCIÓN: CEREMONIA */}
        <motion.div 
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="ubicacion-item"
        >
          <LuChurch className="react-icon" />
          <h2 className="tipo-evento">Misa de Acción de Gracias</h2>
          <h3 className="nombre-lugar">PARROQUIA DE NUESTRA SEÑORA DE LOURDES</h3>
          <p className="direccion-texto">
            Av. Pedro Cárdenas s/n, Col. San Francisco, Monterrey, N.L.
          </p>
          <p className="hora-texto">5:00 PM</p>
          <a 
            href="https://maps.app.goo.gl/uPtoXGgD8aU6rS2y5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-gps"
          >
            ABRIR GPS
          </a>
        </motion.div>

        {/* SECCIÓN: RECEPCIÓN */}
        <motion.div 
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }} 
          className="ubicacion-item"
        >
          <GiGlassCelebration className="react-icon" />
          <h2 className="tipo-evento">Recepción</h2>
          <h3 className="nombre-lugar">QUINTA LAS PALOMAS</h3>
          <p className="direccion-texto">
            Calle de los Jardines #102, Carretera Nacional Km 265, El Uro, Monterrey, N.L.
          </p>
          <p className="hora-texto">8:00 PM</p>
          <a 
            href="https://maps.app.goo.gl/V8MAsvXv8o8A6mHq8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-gps"
          >
            ABRIR GPS
          </a>
        </motion.div>

      </div>
    </section>
  );
}