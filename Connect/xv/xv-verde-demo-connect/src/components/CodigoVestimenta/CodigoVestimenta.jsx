"use client";
import { motion } from "framer-motion";
import './CodigoVestimenta.css';

export default function CodigoVestimenta() {
  return (
    <section className="dress-minimal-section">
      <div className="dress-minimal-container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="dress-floating-icon"
        >
          <img src="/icons/dresscode.png" alt="Dresscode Icon" />
        </motion.div>

        <div className="dress-text-content">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="dress-tag"
          >
            ETIQUETA DEL EVENTO
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="dress-main-title"
          >
            Código de Vestimenta
          </motion.h2>

          <div className="dress-ornament">
             <div className="line"></div>
             <div className="diamond"></div>
             <div className="line"></div>
          </div>

          <div className="dress-flex-info">
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="dress-group"
            >
              <h3 className="dress-label">Damas</h3>
              <p className="dress-desc">VESTIDO LARGO DE GALA</p>
            </motion.div>

            <div className="dress-vertical-divider"></div>

            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="dress-group"
            >
              <h3 className="dress-label">Caballeros</h3>
              <p className="dress-desc">TRAJE FORMAL / ETIQUETA</p>
            </motion.div>
          </div>

          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="dress-footer-note"
          >
            <p>Apreciamos tu elegancia en esta noche especial.</p>
            <p className="highlight">Reserva el color blanco y tonos verdes para la festejada.</p>
          </motion.footer>
        </div>
      </div>
    </section>
  );
}