import React from 'react';
import './ContactoNovios1.css';

const ContactoNovios1 = () => {
  const telefono = "521234567890"; // Reemplaza con el número real
  const mensaje = "¡Hola! Tengo una duda sobre la invitación...";
  
  const whatsappUrl = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <section className="whatsapp-seccion">
      <div className="whatsapp-container">
        <div className="whatsapp-deco-line"></div>
        
        <h2 className="whatsapp-title">¿Tienes alguna duda?</h2>
        
        <p className="whatsapp-text">
          Estamos a tu disposición para ayudarte con cualquier detalle del evento.
        </p>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-button"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="whatsapp-icon"
            fill="currentColor"
          >
            <path d="M12.031 6.172c-2.32 0-4.591.906-6.23 2.541-1.64 1.637-2.548 3.812-2.548 6.126 0 1.583.424 3.127 1.23 4.474l-1.309 3.805 3.945-1.284c1.295.733 2.76 1.121 4.256 1.121h.004c2.32 0 4.591-.906 6.23-2.541 1.64-1.637 2.548-3.812 2.548-6.126 0-2.316-.91-4.49-2.55-6.126-1.64-1.637-3.812-2.548-6.126-2.548zm0 1.15c2.012 0 3.978.786 5.424 2.203 1.447 1.417 2.244 3.303 2.244 5.31s-.797 3.893-2.244 5.31c-1.446 1.417-3.412 2.203-5.424 2.203h-.003c-1.328 0-2.617-.34-3.748-.985l-.268-.154-2.336.76.772-2.244-.17-.282c-.707-1.168-1.08-2.513-1.08-3.894 0-2.007.797-3.893 2.244-5.31 1.446-1.417 3.412-2.203 5.424-2.203z"/>
          </svg>
          Contactar anfitriones
        </a>

        <div className="whatsapp-footer-deco">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </section>
  );
};

export default ContactoNovios1;