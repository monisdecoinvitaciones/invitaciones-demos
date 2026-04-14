"use client";
import { useState } from 'react';
import './Gallery3D.css';

const DATA = [
  { id: 1, title: 'Vale & Chris', img: '/BodaMar/boda9.jpg' },
  { id: 2, title: 'Eve & Omar', img: '/BodaMar/boda10.jpg' },
  { id: 3, title: 'Naley & Juan Carlos', img: '/BodaMar/boda11.jpg' },
  { id: 4, title: 'Jose & Maria', img: '/BodaMar/boda12.jpg' },
  { id: 5, title: 'Lucia & Fer', img: '/BodaMar/boda1.jpg' },
];

export default function Gallery3D() {
  const [rotation, setRotation] = useState(0);
  const angleStep = 360 / DATA.length;

  // Índice activo con fórmula matemática corregida para negativos
  const activeIndex = (Math.round(-rotation / angleStep) % DATA.length + DATA.length) % DATA.length;

  const handlePrev = () => setRotation(prev => prev + angleStep);
  const handleNext = () => setRotation(prev => prev - angleStep);

  const goToIndex = (i) => {
    setRotation(-i * angleStep);
  };

  return (
    <div className="gallery-viewport">
      {/* Botones de Navegación */}
      <button className="nav-btn btn-left" onClick={handlePrev}>❮</button>

      {/* Rueda 3D */}
      <div 
        className="gallery-container-3d" 
        style={{ '--rotate': `${rotation}deg` }}
      >
        {DATA.map((item, i) => (
          <div
            key={item.id}
            className="gallery-card"
            style={{ '--ry': `${i * angleStep}deg` }}
          >
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>

      <button className="nav-btn btn-right" onClick={handleNext}>❯</button>

      {/* Contenedor de Dots */}
      <div className="dots-container">
        {DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`dot-item ${i === activeIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}