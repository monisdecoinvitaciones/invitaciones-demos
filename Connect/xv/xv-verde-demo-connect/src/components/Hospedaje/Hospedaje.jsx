"use client";
import { motion } from "framer-motion";
import "./Hospedaje.css";

const hoteles = [
  {
    id: 1,
    nombre: "Hotel Boutique Chocolate",
    detalle: "A 5 minutos del evento. Una opción acogedora y elegante.",
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    link: "https://maps.google.com"
  },
  {
    id: 2,
    nombre: "Quinta Olivos",
    detalle: "A 10 minutos del evento. Rodeado de naturaleza y calma.",
    imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    link: "https://maps.google.com"
  },
  {
    id: 3,
    nombre: "Residencial Invimon",
    detalle: "Tarifa especial para invitados. Comodidad garantizada.",
    imagen: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    link: "https://maps.google.com"
  }
];

export default function Hospedaje() {
  return (
    <section className="hospedaje-container" id="hospedaje">
      {/* CABECERA CON TÍTULO Y TIANA */}
      <div className="hospedaje-header">
        <motion.img 
          src="princesa/princesa.png" 
          alt="Tiana"
          className="tiana-header-img"
          initial={{ x: -50, opacity: 0, rotate: -10 }}
          whileInView={{ x: 0, opacity: 1, rotate: 5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        
        <motion.h2 
          className="titulo-hospedaje"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Hospedaje Recomendado
        </motion.h2>
      </div>

      <div className="hospedaje-grid">
        {hoteles.map((hotel, index) => (
          <motion.div 
            key={hotel.id}
            className="hotel-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={hotel.imagen} alt={hotel.nombre} className="hotel-image" />
            <div className="hotel-info">
              <h3 className="hotel-nombre">{hotel.nombre}</h3>
              <p className="hotel-detalle">{hotel.detalle}</p>
              <a 
                href={hotel.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-reserva"
              >
                VER UBICACIÓN
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}