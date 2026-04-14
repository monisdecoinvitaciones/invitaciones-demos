import './SeccionTexto.css';

export default function SeccionTexto() {
  return (
    <section className="nuestra-boda animar">
      <div className="contenido">
        <h2 className="txt-huge">NUESTRA BODA</h2>
        <p className="txt-medium">
          Con la bendición de Dios y el amor que nos une, celebramos el inicio de nuestra vida juntos.
        </p>
        {/* Imagen añadida aquí abajo */}
        <img src="/icons/icon-sea-02.png" alt="adorno" className="img-adorno" />
      </div>
    </section>
  );
}