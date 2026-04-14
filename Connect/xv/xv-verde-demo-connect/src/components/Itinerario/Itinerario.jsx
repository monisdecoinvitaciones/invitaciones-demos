"use client";
import { motion } from "framer-motion";
import './Itinerario.css';

export default function Itinerario() {
  const eventos = [
    { icon: "/icons/ceremonia.png", titulo: "Ceremonia", hora: "4:00 PM" },
    { icon: "/icons/recepcion.png", titulo: "Recepción", hora: "5:00 PM" },
    { icon: "/icons/cena.png", titulo: "Cena", hora: "7:00 PM" },
    { icon: "/icons/musica.png", titulo: "Música", hora: "8:00 PM" },
    { icon: "/icons/baile.png", titulo: "Baile", hora: "9:00 PM" },
    { icon: "/icons/pastel.png", titulo: "Pastel", hora: "10:00 PM" },
    { icon: "/icons/final.png", titulo: "Final", hora: "12:00 AM" },
  ];

  // Contenedor principal para coordinar la entrada en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Tiempo entre la aparición de cada bloque
      },
    },
  };

  // Animación para el bloque de texto y caja
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  // Animación específica para que el ICONO haga un efecto de "pop"
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.1 // Aparece ligeramente después que su caja de texto
      }
    }
  };

  return (
    <section className="itinerario-section" id="itinerario">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="titulo-wrapper"
      >
        <span className="subtitulo-curvo">Protocolo del evento</span>
        <h2 className="titulo-itinerario">Itinerario</h2>
        <div className="adorno-itinerario"></div>
      </motion.div>

      <motion.div 
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {eventos.map((e, i) => (
          <motion.div 
            key={i} 
            className="evento-box"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }} 
          >
            <motion.div 
              className="icono-wrapper"
              variants={iconVariants}
            >
              <img 
                src={e.icon} 
                alt={e.titulo} 
                className="icono-img"
                loading="lazy"
              />
            </motion.div>

            <h3 className="evento-nombre">{e.titulo}</h3>
            <p className="evento-hora">{e.hora}</p>

            {/* Separador visual solo visible en desktop */}
            {i < eventos.length - 1 && (
              <div className="separador-wrapper">
                <img 
                  src="/icons/separador.png" 
                  alt="linea"
                  className="separador-img"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="bloque-cierre"
      ></motion.div>
    </section>
  );
}