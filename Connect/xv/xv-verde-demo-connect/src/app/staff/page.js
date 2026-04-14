"use client";
import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./staff.css";

const StaffPage = () => {
  const [autorizado, setAutorizado] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [escaneando, setEscaneando] = useState(false);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbze_dCuef3zOs2Bjuzkcncficmd5g15KNY7Po6RHrKLq7nlCocIk0gppjszA1q4wtiSYA/exec";
  const PASS_SECRETA = "MONIS2026";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pass = params.get("key");

    if (pass === PASS_SECRETA) {
      setAutorizado(true);
      setEscaneando(true);
    } else {
      setAutorizado(false);
    }
  }, []);

  useEffect(() => {
    if (autorizado && escaneando) {
      const html5QrCode = new Html5Qrcode("reader");
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        (decodedText) => {
          html5QrCode.stop().then(() => {
            setEscaneando(false);
            buscarInvitado(decodedText);
          });
        }
      ).catch(() => {
        html5QrCode.start({ facingMode: "user" }, config, (decodedText) => {
          html5QrCode.stop().then(() => {
            setEscaneando(false);
            buscarInvitado(decodedText);
          });
        });
      });

      return () => {
        if (html5QrCode.isScanning) {
          html5QrCode.stop();
        }
      };
    }
  }, [autorizado, escaneando]);

  const buscarInvitado = async (id) => {
    setCargando(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?id=${id}&action=checkin`);
      const data = await response.json();

      if (data.status === "error" && data.message.includes("escaneado")) {
        setResultado({
          ...data,
          status: "ya_escaneado",
          fechaIngreso: data.message.split(": ")[1] || "Ya registrado"
        });
      } else {
        setResultado(data);
      }
    } catch (error) {
      alert("Error al conectar con la base de datos");
      setEscaneando(true);
    }
    setCargando(false);
  };

  if (!autorizado) {
    return (
      <div className="staff-wrapper">
        <div className="status-card error" style={{ marginTop: '50px' }}>
          <span style={{ fontSize: '50px' }}>🔒</span>
          <h2>Acceso Restringido</h2>
          <p>Se requiere una llave de acceso válida.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-wrapper">
      <header className="staff-header">
        <h2 className="text-white txt-huge">Recepción Boda</h2>
        <p className="text-white">VALERIA & ANDRÉS</p>
      </header>

      <main className="staff-main">
        {escaneando && (
          <div className="scanner-container">
            <div id="reader"></div>
            <p className="instruccion text-white">Apunta al código QR del invitado</p>
          </div>
        )}

        {cargando && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p className="text-white">Buscando en lista de invitados...</p>
          </div>
        )}

        {resultado && (
          <div className={`resultado-card ${resultado.status}`}>
            
            {/* 1. CASO: YA ESCANEADO ANTERIORMENTE */}
            {resultado.status === "ya_escaneado" && (
              <div className="alerta-duplicado" style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                padding: '25px', 
                borderRadius: '25px', 
                marginBottom: '20px', 
                border: '1px solid rgba(211, 47, 47, 0.3)', 
                boxShadow: '0 10px 30px rgba(211, 47, 47, 0.15)', 
                animation: 'pulse 1.5s infinite' 
              }}>
                <p style={{ margin: 0, fontSize: '2rem' }}>⚠️</p>
                <h3 style={{ color: '#b33939', margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}> ACCESO DENEGADO</h3>
                <p style={{ color: '#b33939', fontSize: '1rem', margin: '5px 0', fontWeight: 'bold' }}>
                  {resultado.message}
                </p>
              </div>
            )}

            {/* 2. CASO: ÉXITO - MUESTRA TODOS LOS DATOS */}
            {resultado.status === "success" && (
              <>
                <div className="mesa-circle">
                  <span className="text-white">MESA</span>
                  <div className="numero text-white">{resultado.mesa}</div>
                </div>
                <h2 className="nombre-invitado font-body">{resultado.nombre}</h2>

                <div className="detalles-pases">
                  <div className="lista">
                    {/* Desglose de pases */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-around', 
                      marginBottom: '15px',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                      paddingBottom: '10px' 
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', display: 'block', color: '#666', letterSpacing: '1px' }}>ADULTOS</span>
                        <strong style={{ fontSize: '1.4rem', color: '#2d3428' }}>{resultado.adultos}</strong>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', display: 'block', color: '#666', letterSpacing: '1px' }}>NIÑOS</span>
                        <strong style={{ fontSize: '1.4rem', color: '#2d3428' }}>{resultado.niños}</strong>
                      </div>
                    </div>
                    
                    {/* Total destacado */}
                    <div style={{ textAlign: 'center', background: '#f0f2ed', padding: '10px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#6d7a5f', fontWeight: 'bold' }}>
                        TOTAL PASES: {resultado.totalPases}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 3. BOTÓN DE ACCIÓN */}
            {(resultado.status === "success" || resultado.status === "ya_escaneado") && (
                <button
                  className="btn-nuevo-escaneo text-white"
                  style={{ 
                    backgroundColor: resultado.status === "ya_escaneado" ? 'rgba(211, 47, 47, 0.90)' : "#6d7a5f", 
                    fontWeight: 'bold' 
                  }}
                  onClick={() => { setResultado(null); setEscaneando(true); }}
                >
                  {resultado.status === "ya_escaneado" ? "ENTENDIDO" : "CONFIRMAR Y SIGUIENTE"}
                </button>
            )}

            {/* 4. CASO: ERROR GENERAL */}
            {resultado.status === "error" && !resultado.message.includes("escaneado") && (
              <div className="error-msg">
                <p className="text-white">{resultado.message || "Invitado no encontrado."}</p>
                <button
                  className="btn-nuevo-escaneo text-white"
                  onClick={() => { setResultado(null); setEscaneando(true); }}
                >
                  REINTENTAR
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default StaffPage;