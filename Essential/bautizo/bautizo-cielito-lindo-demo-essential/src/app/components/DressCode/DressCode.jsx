'use client';
import React from 'react';
import { useReveal } from '../../hooks/useReveal'; 
import './DressCode.css';

const DressCode = () => {
  const [sectionRef, sectionVisible] = useReveal(0.1);
  const [colorsRef, colorsVisible] = useReveal(0.3);

  // PALETA INTEGRADA Y UNIFICADA (Originales + Nuevos)
 const unifiedPastelPalette = [
  // --- LOS NUEVOS (Ya son pastel) ---
  { id: 'p1', hex: '#FFFACD', name: 'Lemon' },       // Lemon Chiffon
  { id: 'p2', hex: '#FFDAB9', name: 'Peach' },       // Peach Puff
  { id: 'p3', hex: '#DCD0FF', name: 'Lila' },       // Pale Lilac
  { id: 'p4', hex: '#ede9d0', name: 'Beige' },       // Beige (Suavizado)

  // --- LOS TUYOS (Versión Pastelizada) ---
  { id: 'p5', hex: '#F2C6CF', name: 'Malva' },       // Más luz
  { id: 'p6', hex: '#EAD7D9', name: 'Rosa Ceniza' },  // Menos café, más pastel
  { id: 'p7', hex: '#D4E2D4', name: 'Eucalipto' },  // Este es perfecto
  { id: 'p8', hex: '#D1DBE2', name: 'Celeste Grisáceo' },     // Más claro
  
  // --- LOS NEUTROS DE APOYO ---
  { id: 'p9', hex: '#CAD2C5', name: 'Bruma' },
  { id: 'p10', hex: '#FDF5F6', name: 'Pétalo' },
  { id: 'p11', hex: '#F9F1E7', name: 'Champán' },
  { id: 'p12', hex: '#F4F7F6', name: 'Hielo' },
];

  return (
    <section className="dress-code-section" ref={sectionRef}>
      <div className={`dress-line ${sectionVisible ? 'reveal-line' : ''}`}></div>
      
      <div className={`dress-code-container ${sectionVisible ? 'reveal-content' : ''}`}>
        <div className="dress-icon-wrapper">
          <img src="/fotos/iconosRosas/11.png" alt="Dress Code" className="dress-icon" />
        </div>
        
        <h2 className="dress-title">Código de Vestimenta</h2>
        <h3 className="dress-type">FORMAL · COLORES PASTELES</h3>

        <div className="dress-colors-wrapper" ref={colorsRef}>
          
          <div className="unified-palette">
            {/* Se quitó la distinción de Damas/Caballeros */}
            <p className="colors-subtitle">Paleta de colores sugerida:</p>
            
            <div className="colors-grid">
              {unifiedPastelPalette.map((color, index) => (
                <div key={color.id} className="color-item">
                  <div 
                    className={`color-circle ${colorsVisible ? 'reveal-circle' : ''}`}
                    style={{ 
                      backgroundColor: color.hex,
                      // Ajuste del delay para que la animación sea fluida con 12 círculos
                      transitionDelay: `${index * 0.06}s` 
                    }}
                  ></div>
                  <span className="color-name">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <div className={`dress-line ${sectionVisible ? 'reveal-line' : ''}`}></div>
    </section>
  );
};

export default DressCode;