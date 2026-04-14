"use client";
import { QRCodeSVG } from "qrcode.react";
import "./PasePDF.css";

const PasePDF = ({ invitadoData, idElemento }) => {
  if (!invitadoData) return null;

  const adultos = Number(invitadoData.adultos) || 0;
  const ninos = Number(invitadoData.niños || invitadoData.ninos) || 0;
  const totalConfirmados = Number(invitadoData.totalPases) || (adultos + ninos);

  return (
    <div style={{ position: 'absolute', left: '-9999px' }}>
      <div id={idElemento} className="ticket-pdf">
        
        <div className="ticket-header">
          <h1>Nuestra Boda</h1>
          <p className="ticket-subtitle">Valentina & Julián</p>
          <p className="ticket-date">24 . 07 . 2027</p>
          <div className="ticket-divider-sage"></div>
          <p className="ticket-tag">PASE OFICIAL DE ACCESO</p>
        </div>
        
        <div className="ticket-body">
          <p className="ticket-label-small">INVITADO(A)</p>
          <h2 className="ticket-nombre">{invitadoData.nombre}</h2>
          
          <div className="ticket-info-pases">
            <div className="ticket-col">
              <p className="ticket-label">Adultos</p>
              <p className="ticket-value">{adultos}</p>
            </div>

            {ninos > 0 && (
              <div className="ticket-col">
                <p className="ticket-label">Niños</p>
                <p className="ticket-value">{ninos}</p>
              </div>
            )}

            <div className="ticket-col">
              <p className="ticket-label">Total Pases</p>
              <p className="ticket-value">{totalConfirmados}</p>
            </div>
          </div>

          <div className="ticket-qr">
            <QRCodeSVG 
              value={invitadoData.id || "error"} 
              size={140} 
              fgColor="#404D77" // Azul profundo para contraste de escaneo
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="ticket-acompanantes">
            <p className="ticket-label-small">ACOMPAÑANTES CONFIRMADOS</p>
            <p className="ticket-lista">
                {invitadoData.confirmadosLista && invitadoData.confirmadosLista !== "" 
                    ? invitadoData.confirmadosLista 
                    : "Pase Individual"}
            </p>
          </div>
        </div>
        
        <div className="ticket-footer">
          <p>Favor de presentar este pase digital al llegar.</p>
          <div className="ticket-id-footer">ID: {invitadoData.id}</div>
        </div>
      </div>
    </div>
  );
};

export default PasePDF;