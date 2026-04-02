import { useEffect } from 'react';
import './CodigoVestimenta.css';

export default function CodigoVestimenta() {
  useEffect(() => {
    const contenido = document.querySelector(".vestimenta-contenido");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            contenido.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (contenido) observer.observe(contenido);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="vestimenta-seccion" id="vestimenta">
      <div className="vestimenta-contenido">
        <h2 className="vestimenta-titulo txt-huge">CÓDIGO DE VESTIMENTA</h2>
        
        <div className="vestimenta-ilustracion">
          <img src="/icons/vestimenta.png" alt="Vestimenta" />
        </div>

        <div className="vestimenta-info">
          <h3 className="tipo-vestimenta font-bodyColor txt-medium">Formal Playa</h3>
          <p className="descripcion-vestimenta txt-medium">
            Queremos que luzcas increíble pero que también estés cómodo. 
            Recomendamos colores claros y telas frescas.
          </p>
          <div className="detalle-colores color-bronce">
            <span className="color-bronce txt-medium">Guayabera</span>
            <span className="separador color-bronce">|</span>
            <span className="color-bronce txt-medium">Vestido Largo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
