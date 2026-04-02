import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeSVG } from "qrcode.react";
import "./PasePDF.css"

const PasePDF = ({ invitadoData, idElemento }) => {
  if (!invitadoData) return null;

  // Forzamos que los valores sean números. 
  // Usamos corchetes para "niños" por si hay problemas con la codificación de la ñ
  const adultos = Number(invitadoData.adultos) || 0;
  const ninos = Number(invitadoData.niños || invitadoData.ninos) || 0;
  
  // Calculamos el total basándonos en los números ya convertidos
  const totalConfirmados = Number(invitadoData.totalPases) || (adultos + ninos);

  return (
    <div style={{ position: 'absolute', left: '-9999px' }}>
      <div id={idElemento} className="ticket-pdf">
        
        <div className="ticket-header">
          <h1>Nuestra Boda</h1>
          <p className="ticket-subtitle">Gabriela & Edwin</p>
          <p className="ticket-subtitle">22 - 02 - 27</p>
          <div className="ticket-divider-gold"></div>
          <p className="ticket-tag">PASE OFICIAL DE ACCESO</p>
        </div>
        
        <div className="ticket-body">
          <p className="ticket-label-small">INVITADO(A)</p>
          <h2 className="ticket-nombre font-body">{invitadoData.nombre}</h2>
          
          <div className="ticket-info-pases">
            <div className="ticket-col">
              <p className="ticket-label">Adultos</p>
              <p className="ticket-value">{adultos}</p>
            </div>

            {/* Si ninos es > 0 aparecerá la columna */}
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
  size={140} // Un tamaño de 140px es ideal para impresión
  fgColor="#008080" 
  level="H"
  includeMargin={true}
/>
          </div>
          
          <div className="ticket-acompanantes">
            <p className="ticket-label-small">ACOMPAÑANTES CONFIRMADOS</p>
            <p className="ticket-lista">
                {invitadoData.confirmadosLista && invitadoData.confirmadosLista !== "" 
                    ? invitadoData.confirmadosLista 
                    : "Individual"}
            </p>
          </div>
        </div>
        
        <div className="ticket-footer">
          <p>Favor de presentar este pase digital o impreso al llegar.</p>
          <div className="ticket-id-footer">ID: {invitadoData.id}</div>
        </div>
      </div>
    </div>
  );
};

export default PasePDF;