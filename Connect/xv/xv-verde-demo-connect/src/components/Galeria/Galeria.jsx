"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './Galeria.css';

export default function Galeria() {
  const [selectedImage, setSelectedImage] = useState(null);

  const fotos = [
    { src: "/xv2/optimized/xv1.webp", alt: "Momento 1" },
    { src: "/xv2/optimized/xv2.webp", alt: "Momento 2" },
    { src: "/xv2/optimized/xv3.webp", alt: "Momento 3" },
    { src: "/xv2/optimized/xv8.webp", alt: "Momento 4" },
    { src: "/xv2/optimized/xv5.webp", alt: "Momento 5" },
    { src: "/xv2/optimized/xv6.webp", alt: "Momento 6" },
  ];

  // Variantes para la animación de entrada de las fotos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="galeria-royal-section" id="galeria">
      {/* Capa de fondo oscura definida en CSS */}
      <div className="galeria-bg-overlay"></div>
      
      <div className="galeria-royal-container">
        {/* Cabecera de la sección */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="titulo-wrapper"
        >
          <span className="subtitulo-curvo1">Mis momentos</span>
          <h2 className="titulo-galeria">Galería</h2>
          <div className="adorno-galeria"></div>
        </motion.div>

        {/* Grid de imágenes */}
        <motion.div 
          className="galeria-royal-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {fotos.map((foto, i) => (
            <motion.div 
              key={i} 
              className="galeria-royal-item"
              variants={itemVariants}
              onClick={() => setSelectedImage(foto.src)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="img-frame">
                <img 
                  src={foto.src} 
                  alt={foto.alt} 
                  loading="lazy" 
                />
              </div>
              <div className="frame-border"></div>
              
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pantalla completa (Lightbox) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </motion.button>
            
            <motion.img 
              src={selectedImage}
              alt="Imagen ampliada"
              className="lightbox-img"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}