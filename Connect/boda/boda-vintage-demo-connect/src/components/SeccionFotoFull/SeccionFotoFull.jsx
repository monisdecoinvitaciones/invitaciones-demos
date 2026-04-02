import React from 'react';
import './SeccionFotoFull.css';

// Si la imagen está en tu carpeta 'assets', impórtala así:
// import miFoto from '../assets/boda-foto.jpg';

const SeccionFotoFull = () => {
  // Cambia esta URL por la ruta de tu imagen
  const rutaImagen = "/Boda4/optimized/boda10.webp"; 

  return (
    <div className="seccion-foto-full">
      <img 
        src={rutaImagen} 
        alt="Momento especial" 
        className="img-full-pantalla"
        loading="lazy" 
      />
    </div>
  );
};

export default SeccionFotoFull;