"use client";
import { useEffect, useState } from "react";
import FormularioRSVPpremium from "../FormularioRSVPpremium/FormularioRSVPpremium";
import './InvitacionPage.css';
import PasePDF from '../PasePDF/PasePDF';
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";
import { LayoutDashboard, X, ExternalLink } from "lucide-react";

// FIREBASE
import { db } from "../../app/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

const InvitacionPage = () => {
  const [invitadoData, setInvitadoData] = useState(null);
  const [bodaId, setBodaId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fechaLimiteExposicion, setFechaLimiteExposicion] = useState("");

  // 🔐 acceso
  const [passInput, setPassInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buscando, setBuscando] = useState(false);

  // 🖱️ Estado para el modal de la demo
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔧 SETEAR EVENTO
  useEffect(() => {
    const boda = "demo-panel-invimon"; 
    setBodaId(boda);
    setLoading(false);
  }, []);

  // 🔍 BUSCAR INVITADO
  const buscarInvitadoPorCodigo = async () => {
    setErrorStatus(null);

    if (!bodaId) {
      return toast.error("Evento no disponible");
    }

    if (!passInput || passInput.trim().length < 5) {
      return toast.error("Ingresa un código válido");
    }

    setBuscando(true);

    try {
      const codigoLimpio = passInput.trim().toUpperCase();

      const bodaRef = doc(db, "bodas", bodaId);
      const bodaSnap = await getDoc(bodaRef);
      
      let fechaLimiteString = null;

      if (bodaSnap.exists()) {
        const bodaData = bodaSnap.data();
        fechaLimiteString = bodaData.config?.fechaLimiteGlobal || null;
      }

      const invitadoRef = doc(db, "bodas", bodaId, "invitados", codigoLimpio);
      const docSnap = await getDoc(invitadoRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const invitadosArray = Array.isArray(data.invitados) ? data.invitados : [];

        if (fechaLimiteString) {
          const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
          const [year, month, day] = fechaLimiteString.split('-').map(Number);
          const fechaObj = new Date(year, month - 1, day);

          const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);
          setFechaLimiteExposicion(fechaFormateada);

          const limite = new Date(year, month - 1, day);
          limite.setHours(23, 59, 59, 999);

          const hoy = new Date();

          if (hoy > limite && data.asistencia === "pendiente") {
            setErrorStatus("EXPIRED");
            setBuscando(false);
            return;
          }
        }

        const nombresConfirmados = invitadosArray
          .filter(i => i.confirmado)
          .map(i => i.nombre)
          .join(", ");

        const dataMapeada = {
          id: docSnap.id,
          nombre: data.nombre || data.nombreFamilia || "Invitado Especial",
          invitados: invitadosArray,
          yaConfirmo: data.asistencia !== "pendiente",
          asistencia: data.asistencia,
          lado: data.lado || "General",
          mesa: data.mesa || "",
          pasesIniciales: data.pasesIniciales || invitadosArray.length,
          totalConfirmados: data.totalConfirmados || 0,
          confirmadosLista: nombresConfirmados || "Ninguno"
        };

        setInvitadoData(dataMapeada);
        setIsAuthenticated(true);
        toast.success("¡Bienvenido!");

      } else {
        toast.error("Código incorrecto");
      }

    } catch (err) {
      console.error("Error completo:", err);
      toast.error("Error de permisos o conexión");
    } finally {
      setBuscando(false);
    }
  };

  const manejarConfirmacionExitosa = (datosActualizados) => {
    setInvitadoData((prev) => ({
      ...prev,
      asistencia: datosActualizados.asistencia,
      yaConfirmo: true,
      confirmadosLista: Array.isArray(datosActualizados.invitados)
        ? datosActualizados.invitados
            .filter(i => i.confirmado)
            .map(i => i.nombre)
            .join(", ")
        : "Ninguno",
      adultos: datosActualizados.adultos,
      ninos: datosActualizados.ninos,
      totalConfirmados: datosActualizados.totalConfirmados,
      invitados: datosActualizados.invitados || []
    }));
  };

  if (loading) {
    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card loading">
          <div className="spinner" style={{ borderTopColor: '#404D77' }}></div>
          <p style={{ color: '#404D77', fontFamily: 'Montserrat, sans-serif' }}>Procesando...</p>
        </div>
      </div>
    );
  }

  // 🔐 LOGIN 
  if (!isAuthenticated && errorStatus !== "EXPIRED") {
    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card auth-card" style={{ textAlign: 'center', borderColor: '#CDDFE9' }}>
          <h2 className="txt-large" style={{ color: '#404D77', margin: '15px 0', fontFamily: 'Cinzel, serif' }}>
            CONFIRMAR ASISTENCIA
          </h2>

          <p className="txt-medium" style={{ color: '#666', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            Ingresa tu código de invitado para confirmar tu asistencia.
          </p>

          <input 
            type="text" 
            placeholder="CÓDIGO"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarInvitadoPorCodigo()}
            maxLength={15}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid #404D77',
              textAlign: 'center',
              width: '100%',
              maxWidth: '200px',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              letterSpacing: '5px',
              margin: '20px 0',
              outline: 'none',
              background: '#fff',
              color: '#404D77',
              fontFamily: 'Montserrat, sans-serif'
            }}
          />

          <button 
            onClick={buscarInvitadoPorCodigo}
            className="btn-rsvp"
            disabled={buscando}
            style={{ width: '100%', maxWidth: '250px', backgroundColor: '#404D77' }}
          >
            {buscando ? "BUSCANDO..." : "INGRESAR"}
          </button>

          <div style={{ marginTop: '25px', borderTop: '1px solid #CDDFE9', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: '#92966F', marginBottom: '10px', fontFamily: 'Montserrat, sans-serif' }}>
                ¿Eres cliente y quieres ver el panel?
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'none',
                border: '1px solid #404D77',
                color: '#404D77',
                padding: '8px 15px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                fontFamily: 'Cinzel, serif'
              }}
            >
              <LayoutDashboard size={14} /> Acceso Demo Panel
            </button>
          </div>
        </div>

        {/* MODAL DE ACCESO DEMO */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content1" onClick={(e) => e.stopPropagation()} style={{ borderColor: '#CDDFE9' }}>
              <button className="modal-close" onClick={() => setIsModalOpen(false)} style={{ color: '#404D77' }}><X size={24} /></button>
              
              <div className="modal-header">
                <div className="modal-icon-bg" style={{ backgroundColor: '#FFFEFC', color: '#404D77', border: '1px solid #CDDFE9' }}>
                  <LayoutDashboard size={32} />
                </div>
                <h3 style={{ margin: '15px 0 10px', fontSize: '1.5rem', color: '#404D77', fontFamily: 'Cinzel, serif' }}>
                    ¡Olvídate de papel y Excel!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.4', fontFamily: 'Cormorant Garamond, serif' }}>
                  Te invitamos a explorar nuestro panel administrativo para que veas cómo funciona en tiempo real.
                </p>
              </div>

              <div className="credentials-box" style={{ 
                background: '#FFFEFC', 
                border: '1px dashed #92966F', 
                borderRadius: '12px', 
                padding: '15px', 
                margin: '20px 0',
                textAlign: 'left' 
              }}>
                <p style={{ fontSize: '0.7rem', color: '#404D77', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'Montserrat, sans-serif' }}>
                  Datos de acceso:
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#92966F', fontSize: '0.9rem' }}>Usuario:</span>
                  <span style={{ fontWeight: '600', color: '#404D77', fontSize: '0.9rem' }}>demo@invimon.com</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#92966F', fontSize: '0.9rem' }}>Contraseña:</span>
                  <span style={{ fontWeight: '600', color: '#404D77', fontSize: '0.9rem' }}>invimon2026</span>
                </div>
              </div>

              <div className="modal-footer">
                <a 
                  className="btn-go-panel"
                  href="https://app.invimon.com/login" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ backgroundColor: '#404D77', color: '#fff' }}
                >
                  <span style={{ width: '18px' }}></span>
                  <span style={{ flex: 1, textAlign: 'center', fontFamily: 'Cinzel, serif' }}>Ir al Panel</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (errorStatus === "EXPIRED") {
    return (
      <div className="invitacion-status-wrapper">
        <div className="status-card expired" style={{ borderColor: '#CDDFE9' }}>
          <span className="icon">⏳</span>
          <h2 className="txt-large" style={{ color: '#404D77', fontFamily: 'Cinzel, serif' }}>Fecha Límite Excedida</h2>
          <p style={{ color: '#666', fontFamily: 'Cormorant Garamond, serif' }}>Lo sentimos, el periodo de confirmación terminó el día:</p>
          <strong style={{ color: '#92966F', fontSize: '1.2rem' }}>{fechaLimiteExposicion}</strong>
        </div>
      </div>
    );
  }

  if (invitadoData?.yaConfirmo) {
    const declinoAsistencia = invitadoData.asistencia === "No";

    const descargarPDF = async () => {
      if (isGenerating) return;
      setIsGenerating(true);

      try {
        const html2pdf = (await import('html2pdf.js')).default;
        const elemento = document.getElementById('pase-digital-download');
        const opciones = {
          margin: 10,
          filename: `Pase_${invitadoData.nombre}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 3, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opciones).from(elemento).save();
        toast.success("Descarga exitosa");
      } catch (error) {
        toast.error("Error al generar PDF");
      } finally {
        setIsGenerating(false);
      }
    };

    return (
      <div className="invitacion-status-wrapper" id="rsvp">
        <div className="status-card success" style={{ borderColor: '#CDDFE9' }}>
          <div className="header-success">
            <h2 className="txt-large" style={{ color: '#404D77', fontFamily: 'Cinzel, serif' }}>
              HOLA {invitadoData.nombre.toUpperCase()}
            </h2>
            {declinoAsistencia ? (
              <p style={{ color: '#666', fontFamily: 'Cormorant Garamond, serif' }}>Has registrado que no podrás asistir. ¡Te extrañaremos!</p>
            ) : (
              <>
                <p style={{ color: '#92966F', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>¡Asistencia registrada con éxito!</p>
                <p style={{ color: '#404D77', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>Ya puedes descargar tus pases oficiales.</p>
              </>
            )}
          </div>

          <div className="info-resumen" style={{ backgroundColor: '#FFFEFC' }}>
            {declinoAsistencia ? (
              <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <span style={{ fontSize: '3rem' }}>💌</span>
                <p style={{ marginTop: '15px', color: '#666', fontFamily: 'Cormorant Garamond, serif' }}>
                  Tu respuesta ha sido guardada. Si tus planes cambian, por favor contacta a los anfitriones.
                </p>
              </div>
            ) : (
              <>
                <div className="dato" style={{ borderBottom: '1px solid #CDDFE9', paddingBottom: '10px' }}>
                  <span style={{ color: '#92966F' }}>Confirmados:</span>
                  <strong style={{ color: '#404D77' }}>{invitadoData.confirmadosLista}</strong>
                </div>

                <button 
                  onClick={descargarPDF}
                  className="btn-rsvp"
                  disabled={isGenerating}
                  style={{ margin: '20px auto', display: 'block', backgroundColor: '#404D77' }}
                >
                  {isGenerating ? "GENERANDO..." : "DESCARGAR PASES"}
                </button>

                <div className="qr-container" style={{ display: 'flex', justifyContent: 'center', padding: '15px', background: '#fff', borderRadius: '15px', border: '1px solid #CDDFE9' }}>
                  <QRCodeSVG 
                    value={`${bodaId}-${invitadoData.id}`} 
                    size={150} 
                    fgColor="#404D77" 
                    level="H"
                  />
                </div>
                <br/>
                <div className="dato" style={{ textAlign: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#666', fontSize: '0.9rem', fontFamily: 'Cormorant Garamond, serif' }}>
                    Presenta este código en la entrada del evento.
                  </span>
                </div>

                <PasePDF 
                  invitadoData={invitadoData} 
                  idElemento="pase-digital-download" 
                  bodaId={bodaId}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // En el return final de InvitacionPage
return (
  <div id="rsvp"> 
    <FormularioRSVPpremium 
      invitadoData={invitadoData} 
      bodaId={bodaId} 
      onSuccess={manejarConfirmacionExitosa}
      fechaLimite={fechaLimiteExposicion} // <--- Pasamos la prop aquí
    />
  </div>
);
};

export default InvitacionPage;