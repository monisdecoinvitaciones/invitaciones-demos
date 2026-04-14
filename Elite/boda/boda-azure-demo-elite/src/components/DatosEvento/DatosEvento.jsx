
import './DatosEvento.css';

export default function DatosEvento() {
  return (
    <section className="datos-evento" id="datos">
      
      {/* SECCIÓN 1: MISA */}
      <div className="bloque misa">
        <div className="tarjeta">
          <div className="foto-redonda">
            <img src="/icons/ceremoniaa.jpg" alt="Iglesia" />
          </div>
          <h2 className="titulo-tarjeta txt-huge text-white">MISA</h2>
          <p className="txt-medium text-white">IGLESIA SAN JUAN BAUTISTA</p>
          <p className="direccion-texto txt-medium text-white">Calle Independencia #123, Col. Centro, CP 45400</p>
          <p className="hora-texto txt-medium text-white">4:00 PM</p>
          <a href="https://maps.google.com" target="_blank" className="btn-mapa text-white">
            VER UBICACIÓN
          </a>
        </div>
      </div>

      {/* SECCIÓN 2: RECEPCIÓN */}
      <div className="bloque recepcion">
        <div className="tarjeta">
          <div className="foto-redonda">
            <img src="/icons/salon.jpg" alt="Salón" />
          </div>
          <h2 className="titulo-tarjeta txt-huge text-white">RECEPCIÓN</h2>
          <p className=" txt-medium text-white">SALON LOS OLIVOS</p>
          <p className="direccion-texto txt-medium text-white">Av. de los Laureles #45, Tonalá, Jalisco</p>
          <p className="hora-texto txt-medium text-white">6:00 PM</p>
          <a href="https://maps.google.com" target="_blank" className="btn-mapa text-white">
            VER UBICACIÓN
          </a>
        </div>
      </div>

    </section>
  );
}