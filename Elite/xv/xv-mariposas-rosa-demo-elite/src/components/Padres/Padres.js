import './Padres.css';

export default function Padres() {
  return (
    <section className="padres animar" id="padres">
      <div className="contenido">
        <h2 className="txt-huge">NUESTROS PADRES</h2>

        <div className="separador animar">
          <div className="linea"></div>
        </div>

        <div className="padres-grid">
          <div className="lado"> 
            <h3 className="font-bodyColor txt-medium">PADRES DE LA NOVIA</h3>
            <p>María López</p>
            <p>José Martínez</p>
          </div>

          <div className="lado">
            <h3 className="font-bodyColor txt-medium">PADRES DEL NOVIO</h3>
            <p>Ana Rodríguez</p>
            <p>Carlos Hernández</p>
          </div>
        </div>
      </div>
    </section>
  );
}