"use client";
import { motion } from "framer-motion";
import { Utensils, GlassWater, Coffee } from "lucide-react";
import "./Amenidades.css";

const Amenidades = () => {
  return (
    <section className="amenidades-container" id="menu">
      {/* Eucalipto Superior Izquierdo (Normal) */}
      <img 
        src="princesa/optimized/eucalipto.webp" 
        alt="decor" 
        className="eucalipto-menu top-left-menu" 
      />

      <motion.div 
        className="menu-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="menu-header">
          <Utensils className="menu-icon-main" />
          <h2 className="titulo-menu">Menú de la Noche</h2>
          <div className="divider-oro"></div>
        </div>

        <div className="menu-secciones">
          <div className="menu-grupo">
            <h3>Entrada</h3>
            <p>Crema de Cilantro con Nuez y Crutones al Ajo</p>
          </div>

          <div className="menu-grupo">
            <h3>Plato Fuerte</h3>
            <p>Pechuga de Pollo en Salsa de Tres Quesos, acompañada de Atado de Verduras y Puré de Papa Rústico</p>
          </div>

          <div className="menu-grupo">
            <h3>Postre</h3>
            <p>Mousse de Chocolate Semiamargo con Frutos Rojos</p>
          </div>
        </div>

        <div className="menu-footer">
          <div className="footer-item">
            <GlassWater size={20} />
            <span>Barra Libre Premium</span>
          </div>
          <div className="footer-item">
            <Coffee size={20} />
            <span>Servicio de Café</span>
          </div>
        </div>
      </motion.div>

      {/* Eucalipto Inferior Derecho (Efecto Espejo) */}
      <img 
        src="princesa/optimized/eucalipto.webp" 
        alt="decor" 
        className="eucalipto-menu bottom-right-menu" 
      />
    </section>
  );
};

export default Amenidades;