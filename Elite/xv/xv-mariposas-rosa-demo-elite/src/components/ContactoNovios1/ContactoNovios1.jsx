import './ContactoNovios1.css';

export default function ContactoNovios1() {
  const numAtencion = "523322283707"; 
  // Mensaje configurado para tu servicio de InviMon
  const mensajeWhatsApp = encodeURIComponent("¡Hola! Me interesa una invitación paquete elite pro");

  return (
    <section className="contacto-organic" id='contacto'>
      <div className="contacto-container">
        <div className="contacto-header">
          <h2>ESTAMOS PARA AYUDARTE</h2>
          <p className="txt-medium">Cualquier duda, estamos a un mensaje de distancia.</p>
        </div>

        <div className="grid-nombres">
          <div className="contacto-item">
            <span>La Quinceañera</span>
            <a 
              href={`https://wa.me/${numAtencion}?text=${mensajeWhatsApp}`} 
              className="btn-minimal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar WhatsApp
            </a>
          </div>

          <div className="ampersand">&</div>

          <div className="contacto-item">
            <span>Mamá de la Quinceañera</span>
            <a 
              href={`https://wa.me/${numAtencion}?text=${mensajeWhatsApp}`} 
              className="btn-minimal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}