"use client";
import { motion } from "framer-motion";
import './Hero.css';

export default function Hero() {
  // Variantes para animaciones en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Tiempo entre la aparición de cada elemento
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="hero-section" id='inicio'>
      {/* Contenedor de la imagen principal con zoom suave */}
      <div className="hero-image-container">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/xv2/optimized/xv2.webp" 
          alt="Portada Quinceañera" 
          className="hero-main-photo"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Contenido de texto con animación de entrada */}
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className="hero-subtitle">
          ESTÁS INVITADO A LOS
        </motion.span>
        
        <motion.h1 variants={itemVariants} className="hero-title">
          <span className="xv-big">XV</span>
          <span className="anos-text">AÑOS DE</span>
        </motion.h1>

        <motion.h2 variants={itemVariants} className="hero-name">
          Mariana Isabel
        </motion.h2>

        <motion.div variants={itemVariants} className="linea-elegante-hero"></motion.div>

        <motion.p variants={itemVariants} className="hero-date">
          24 . 07 . 2027
        </motion.p>
      </motion.div>
    </section>
  );
}