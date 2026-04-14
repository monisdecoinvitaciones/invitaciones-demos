"use client";
import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import "./Firmas.css";

const LibroDeFirmas = () => {
  const canvasRef = useRef(null);
  const sigPad = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const tempContent = sigPad.current ? sigPad.current.toDataURL() : null;
      const wasEmpty = sigPad.current ? sigPad.current.isEmpty() : true;

      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);

      if (sigPad.current) {
        sigPad.current.clear();
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
    setStatus({ type: '', message: '' });
  };

  const enviarFirma = async () => {
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || sigPad.current.isEmpty()) {
      setStatus({ type: 'error', message: 'Por favor, rellena tu nombre y firma.' });
      return;
    }

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

      setStatus({ type: 'success', message: '¡Tu mensaje ha sido enviado con éxito! Gracias.' });
      limpiar();
      document.getElementById('nombre').value = "";
      document.getElementById('mensaje').value = "";
      
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus({ type: 'error', message: 'Hubo un error en la conexión. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guestbook-container">
      <h1 className="guestbook-title">Libro de firmas</h1>
      
      {/* SEPARADOR CON TU ARCHIVO .WEBP */}
      <div className="guestbook-divider">
        <img 
          src="/icons/separador.webp" 
          alt="Separador decorativo" 
          className="divider-img" 
        />
      </div>

      <div className="form-group">
        <input id="nombre" className="input-field" type="text" placeholder="Tu Nombre*" disabled={loading} />
      </div>

      <div className="form-group">
        <label className="label-text">Dedícame unas lindas palabras</label>
        <textarea id="mensaje" className="input-field textarea-field" placeholder="Escribe aquí*" disabled={loading}></textarea>
      </div>

      <div className="signature-wrapper">
        <button className="btn-clear" onClick={limpiar} disabled={loading}>×</button>
        <canvas ref={canvasRef} />
      </div>

      <button 
        className={`btn-submit ${loading ? 'btn-disabled' : ''}`} 
        onClick={enviarFirma}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default LibroDeFirmas;