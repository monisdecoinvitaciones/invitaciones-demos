import React from 'react';
import './Hospedaje.css';

const hoteles = [
  {
    id: 1,
    nombre: "Hotel Boutique Chocolate",
    distancia: "A 5 minutos del evento",
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    link: "https://maps.google.com"
  },
  {
    id: 2,
    nombre: "Quinta Olivos",
    distancia: "A 10 minutos del evento",
    imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    link: "https://maps.google.com"
  },
  {
    id: 3,
    nombre: "Residencial Invimon",
    distancia: "Tarifa especial invitados",
    imagen: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    link: "https://maps.google.com"
  }
];

const Hospedaje = () => {
  return (
    <section className="hospedaje-seccion fade-in" id='hospedaje'>
      <h2 className="titulo">Hospedaje Recomendado</h2>
      <p className="mensaje-intro">Opciones cercanas para tu comodidad</p>
      
      <div className="slider-contenedor">
        {hoteles.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <div 
              className="hotel-imagen" 
              style={{ backgroundImage: `url(${hotel.imagen})` }}
            >
              <div className="hotel-overlay"></div>
            </div>
            <div className="hotel-info">
              <h3>{hotel.nombre}</h3>
              <p>{hotel.distancia}</p>
              <a 
                href={hotel.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-hotel"
              >
                Ver Ubicación
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hospedaje;