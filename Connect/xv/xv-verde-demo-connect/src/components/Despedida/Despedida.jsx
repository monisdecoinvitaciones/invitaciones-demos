"use client";
import { motion } from "framer-motion";
import "./Despedida.css";

const Despedida = () => {
  return (
    <section className="despedida-section">
      {/* Capa de superposición para asegurar la legibilidad del texto */}
      <div className="despedida-overlay"></div>

      <div className="despedida-container">
        <motion.div 
          className="despedida-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Título manuscrito */}
          <h2 className="despedida-titulo">¡Te esperamos!</h2>
          
          {/* Mensaje final serif */}
          <p className="despedida-mensaje">
            Gracias por ser parte de mi historia y por acompañarme en esta noche mágica.
            Tu presencia es mi mejor regalo.
          </p>
          
          {/* Firma o detalle final */}
          <p className="despedida-firma">Con cariño, Mariana Isabel</p>

          {/* Botón opcional para volver arriba o cerrar (estilo Tiana) */}
          <motion.button 
            className="btn-subir"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver al inicio
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Despedida;