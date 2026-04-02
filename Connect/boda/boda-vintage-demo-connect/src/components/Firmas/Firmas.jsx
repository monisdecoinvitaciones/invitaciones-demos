import React, { useRef, useEffect, useState } from 'react'; // 1. Añadimos useState
import SignaturePad from 'signature_pad';
import "./Firmas.css"; // Asegúrate de que el CSS esté vinculado

const LibroDeFirmas = () => {
  const canvasRef = useRef(null);
  const sigPad = useRef(null);
  
  // 2. Estados para el control de carga y mensajes
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      
      // Guardamos el contenido actual antes de redimensionar
      const tempContent = sigPad.current ? sigPad.current.toDataURL() : null;
      const wasEmpty = sigPad.current ? sigPad.current.isEmpty() : true;

      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);

      if (sigPad.current) {
        sigPad.current.clear(); // Limpiamos el ruido del redimensionado
        
        // Si NO estaba vacío, restauramos lo que el usuario ya había dibujado
        if (!wasEmpty && tempContent) {
          sigPad.current.fromDataURL(tempContent);
        }
      }
    };

    sigPad.current = new SignaturePad(canvas, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)'
    });

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const limpiar = () => {
    sigPad.current.clear();
    setStatus({ type: '', message: '' }); // Limpia mensajes al resetear
  };

  const enviarFirma = async () => {
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || sigPad.current.isEmpty()) {
      setStatus({ type: 'error', message: 'Por favor, rellena tu nombre y firma.' });
      return;
    }

    // 3. Iniciar estado de carga
    setLoading(true);
    setStatus({ type: 'info', message: 'Enviando mensaje...' });

    const datos = {
      nombre: nombre,
      mensaje: mensaje,
      firma: sigPad.current.toDataURL("image/png")
    };

    const scriptURL = "https://script.google.com/macros/s/AKfycbyi_Iblki4Mj6noxCJUQVuNdLRJccQdUZjNxQpurQ8pYqz0eNmMWIMZ2rJLKFG8f2qT/exec";

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(datos)
      });

      // 4. Éxito
      setStatus({ type: 'success', message: '¡Tu mensaje ha sido enviado con éxito! Gracias.' });
      limpiar();
      document.getElementById('nombre').value = "";
      document.getElementById('mensaje').value = "";
      
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus({ type: 'error', message: 'Hubo un error en la conexión. Inténtalo de nuevo.' });
    } finally {
      // 5. Finalizar carga sin importar si hubo éxito o error
      setLoading(false);
    }
  };

  return (
    <div className="guestbook-container">
      <h1 className="guestbook-title text-white txt-huge">LIBRO DE FIRMAS</h1>

      <div className="form-group">
        <input id="nombre" className="input-field" type="text" placeholder="Tu Nombre*" disabled={loading} />
      </div>

      <div className="form-group">
        <label className="label-text">Dedícanos unas lindas palabras</label>
        <textarea id="mensaje" className="input-field textarea-field" placeholder="Escribe aquí*" disabled={loading}></textarea>
      </div>

      <div className="signature-wrapper">
        <button className="btn-clear" onClick={limpiar} disabled={loading}>×</button>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 6. Botón condicional */}
      <button 
        className={`btn-submit ${loading ? 'btn-disabled' : ''}`} 
        onClick={enviarFirma}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {/* 7. Mensajes de feedback */}
      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default LibroDeFirmas;