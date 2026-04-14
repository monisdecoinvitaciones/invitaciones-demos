
import './AppFotos.css';

export default function AppFotos() {
  return (
    <section className="app-seccion">
      <div className="app-card">
        {/* Logo de la Cámara con animación de flotado */}
        <div className="camara-contenedor">
          <img src="/icons/camara.png" alt="Cámara" className="camara-logo" />
        </div>

        <h2 className="app-titulo">¡Nuestra Galería Compartida!</h2>
        <p className="app-descripcion txt-medium">
          ¡Todas las fotos que tomen ustedes, nuestros invitados, las tendremos en una misma galería!
        </p>

        <div className="pasos-contenedor">
          <div className="paso-item">
            <span className="paso-numero text-white">1</span>
            <p >Descarga la app <a href="https://www.wedshoots.com/mx?albumId=" target="_blank" className="link-app">Click aquí.</a></p>
          </div>
          
          <div className="paso-item">
            <span className="paso-numero text-white">2</span>
            <p>Una vez descargada la app, da click en <strong>"Soy Invitado"</strong>.</p>
          </div>

          <div className="paso-item">
            <span className="paso-numero text-white">3</span>
            <p>Introduce nuestro código <span className="codigo-app">02 02 02 02</span></p>
          </div>
        </div>

        <div className="qr-aviso">
          <p>Durante la fiesta únete a nuestra galería escaneando los códigos QR ubicados en el lugar.</p>
        </div>
      </div>
    </section>
  );
}