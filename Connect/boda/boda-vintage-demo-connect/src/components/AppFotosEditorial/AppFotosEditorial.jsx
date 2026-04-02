"use client";
import './AppFotosEditorial.css';

export default function AppFotosEditorial() {
  const hashtag = "#BodaTropical2027";

  const copiarHashtag = async () => {
    const hint = document.querySelector('.copy-status');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(hashtag);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = hashtag;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      hint.innerText = "¡Copiado!";
      hint.classList.add('active');
    } catch (err) {
      hint.innerText = "Error al copiar";
    } finally {
      setTimeout(() => {
        hint.innerText = "Click para copiar";
        hint.classList.remove('active');
      }, 2000);
    }
  };

  return (
    <section className="app-editorial-seccion">
      <div className="app-wrapper">
        
        {/* Lado Izquierdo: Visual */}
        <div className="app-visual">
          <div className="camara-frame">
            <img src="/IconosRosaSandia/18.png" alt="Instagram" className="camara-logo-minimal" />
          </div>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="app-contenido">
          <span className="app-subtitulo">Momentos Compartidos</span>
          <h2 className="app-titulo-moderno">INSTAGRAM</h2>
          
          <p className="app-descripcion">
            Ayúdanos a capturar cada sonrisa. Sube tus fotos y videos usando nuestro hashtag oficial para que podamos revivir la boda a través de tus ojos.
          </p>

          <div className="timeline-pasos">
            <div className="step-box">
              <span className="step-label">PASO 01</span>
              <p className="step-text">Toma una foto o video increíble.</p>
            </div>

            <div className="step-box">
              <span className="step-label">PASO 02</span>
              <p className="step-text">Súbelo a tus Stories o a tu Perfil.</p>
            </div>

            <div className="step-box">
              <span className="step-label">PASO 03</span>
              <div className="hashtag-interaction" onClick={copiarHashtag}>
                <p className="step-text">Etiquétanos con el hashtag:</p>
                <div className="codigo-destacado">
                  {hashtag}
                </div>
                <span className="copy-status">Click para copiar</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}