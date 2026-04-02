
import './ContactoNovios.css';

export default function ContactoNovios() {
  return (
    <section className="contacto-wrapper" id="contacto">
      <div className="contacto-card">
        <h2 className="txt-large">¿DUDAS O ACLARACIONES?</h2>
        <p className="txt-medium">
          Si te equivocaste al confirmar, necesitas cambiar algo o tienes alguna duda,
          comunícate directamente con nosotros 💛
        </p>

        <div className="contacto-botones">
          <a
            href="https://wa.me/521XXXXXXXXXX?text=Hola,%20tengo%20una%20duda%20sobre%20la%20confirmación%20de%20la%20boda"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wsp novio text-white "
          >
            WhatsApp Novio
          </a>

          <a
            href="https://wa.me/521YYYYYYYYYY?text=Hola,%20tengo%20una%20duda%20sobre%20la%20confirmación%20de%20la%20boda"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wsp novia text-white "
          >
            WhatsApp Novia
          </a>
        </div>
      </div>
    </section>
  );
}
