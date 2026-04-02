"use client";
import { useEffect, useState } from "react";
import FormularioRSVPpremium from "../FormularioRSVPpremium/FormularioRSVPpremium";
import './InvitacionPage.css';
import { QRCodeCanvas } from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
import PasePDF from '../PasePDF/PasePDF';

const InvitacionPage = () => {
  const [invitadoData, setInvitadoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const SCRIPT_URL_UNIFICADO = "https://script.google.com/macros/s/AKfycbze_dCuef3zOs2Bjuzkcncficmd5g15KNY7Po6RHrKLq7nlCocIk0gppjszA1q4wtiSYA/exec";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      setLoading(false);
      setErrorStatus("NOT_FOUND");
      return;
    }

    fetch(`${SCRIPT_URL_UNIFICADO}?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const hoy = new Date();
          const limite = new Date(data.fechaLimite);
          
          if (hoy > limite && !data.yaConfirmo) {
            setErrorStatus("EXPIRED");
          } else {
            setInvitadoData({ ...data, id: id });
          }
        } else {
          setErrorStatus("NOT_FOUND");
        }
      })
      .catch(() => setErrorStatus("NOT_FOUND"))
      .finally(() => setLoading(false));
  }, []);

  const manejarConfirmacionExitosa = (datosActualizados) => {
    setInvitadoData({
      ...invitadoData,
      ...datosActualizados,
      yaConfirmo: true,
      confirmadosLista: datosActualizados.nombresConfirmados
    });
  };

  // 1. ID EN LOADING
  if (loading) {
    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card loading">
          <div className="spinner"></div>
          <p>Cargando tu invitación...</p>
        </div>
      </div>
    );
  }

  if (errorStatus === "NOT_FOUND") {
    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card error">
          <span className="icon">⚠️</span>
          <h2 className="txt-large font-body">Invitación no encontrada</h2>
          <p>Lo sentimos, el enlace es incorrecto o la invitación ya no existe.</p>
        </div>
      </div>
    );
  }

  if (errorStatus === "EXPIRED") {
    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card expired">
          <span className="icon">⏳</span>
          <h2 className="txt-large font-body">Pases reasignados</h2>
          <p>La fecha límite para confirmar ha pasado y los lugares han sido liberados.</p>
        </div>
      </div>
    );
  }

  // 2. ID EN VISTA DE ÉXITO (Pases/QR)
  if (invitadoData?.yaConfirmo) {
    const noAsistira = invitadoData.asistencia === "No" || invitadoData.confirmadosLista === "Ninguno";

    const descargarPDF = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
  
        try {
          const response = await fetch(`${SCRIPT_URL_UNIFICADO}?id=${invitadoData.id}&action=pdf`);
          const dataFinal = await response.json();
  
          if (dataFinal.status === "success") {
            const updatedData = { 
              ...dataFinal, 
              id: invitadoData.id,
              yaConfirmo: true 
            };
            setInvitadoData(updatedData);
  
            setTimeout(async () => {
              const html2pdf = (await import('html2pdf.js')).default;
              const elemento = document.getElementById('pase-digital-download');
              
              const opciones = {
                margin: 10,
                filename: `Pase_Boda_${updatedData.nombre}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 3, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
              };
  
              await html2pdf().set(opciones).from(elemento).save();
              setIsGenerating(false);
            }, 800);
          } else {
            alert("Error al obtener datos del boleto: " + dataFinal.message);
            setIsGenerating(false);
          }
        } catch (error) {
          console.error("Error en la descarga:", error);
          alert("Hubo un problema al conectar con el servidor.");
          setIsGenerating(false);
        }
    };

    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card success">
          <div className="header-success">
            <h2 className="txt-large font-body">{invitadoData.nombre.toUpperCase()}</h2>
            <p>Tu respuesta ya ha sido registrada.</p>
          </div>

          <div className="info-resumen">
            {noAsistira ? (
              <div className="mensaje-cancelado">
                <p>Has registrado que <strong>no podrás asistir</strong>. Te extrañaremos en la celebración.</p>
              </div>
            ) : (
              <>
                <div className="dato">
                  <span>Confirmados:</span>
                  <strong>{invitadoData.confirmadosLista}</strong>
                </div>

                <p className="mensaje-intro" style={{ textAlign: 'center', marginTop: '30px', fontWeight: '600', color: '#6d7a5f' }}>
                    {isGenerating ? "Preparando tus pases..." : "Ya puedes descargar tus pases oficiales:"}
                </p>

                <button 
                  onClick={descargarPDF} 
                  className={`btn-rsvp ${isGenerating ? 'loading' : ''}`}
                  disabled={isGenerating}
                  style={{ margin: '15px auto 30px', display: 'block', opacity: isGenerating ? 0.7 : 1 }}
                >
                  {isGenerating ? "GENERANDO..." : "DESCARGAR PASES (PDF)"}
                </button>

                <div className="qr-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div className="qr-contenedor" style={{ background: 'white', padding: '15px', borderRadius: '15px', border: '1px solid #eee' }}>
                    <QRCodeSVG 
  value={invitadoData.id || "error"} 
  size={140} // Un tamaño de 140px es ideal para impresión
  fgColor="#008080" 
  level="H"
  includeMargin={true}
/>
                  </div>
                  <p className="qr-subtext" style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>
                    Presenta este código en la entrada
                  </p>
                </div>
              </>
            )}
          </div>
          <PasePDF invitadoData={invitadoData} idElemento="pase-digital-download" />
        </div>
      </div>
    );
  }

  // 3. ID EN FORMULARIO (Vista principal)
  return (
    <div id="rsvp"> 
      <FormularioRSVPpremium 
        invitadoData={invitadoData} 
        SCRIPT_URL={SCRIPT_URL_UNIFICADO} 
        onSuccess={manejarConfirmacionExitosa} 
      />
    </div>
  );
};

export default InvitacionPage;