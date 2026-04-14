"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import "./Contacto.css";

const Contacto = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="contacto-section">
      <div className="contacto-container">
        
        {/* Contenedor Izquierdo */}
        <div className="contacto-info">
          <h2 className="contacto-titulo">¿Dudas?</h2>
          <motion.img 
            src="/princesa/luciernaga.png" 
            alt="luciernaga" 
            className="luciernaga-contacto"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>

        {/* Contenedor Derecho */}
        <div 
          className="flip-card-wrapper"
          onClick={() => setIsFlipped(!isFlipped)}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <motion.div 
            className="flip-card-inner"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* LADO FRONTAL */}
            <div className="flip-card-front">
              <div className="front-content">
                <Send className="icon-floating" size={40} />
                <h3>Estamos para apoyarte</h3>
                <p>Haz clic para ver nuestras opciones de contacto</p>
              </div>
            </div>

            {/* LADO TRASERO */}
            <div className="flip-card-back">
              <div className="back-content">
                <MessageCircle size={45} color="#fff" />
                <h3>WhatsApp</h3>
                <p>Escríbenos directamente para confirmar o resolver dudas.</p>
                <a 
                  href="https://wa.me/3322283707" 
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Enviar Mensaje
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contacto;