"use client";
import { useState, useEffect } from "react";
import './FormularioRSVPpremium.css';

const FormularioRSVPpremium = ({ invitadoData, SCRIPT_URL, onSuccess }) => {
  const [asistenciaGlobal, setAsistenciaGlobal] = useState(""); 
  const [acompañantesAsistiran, setAcompañantesAsistiran] = useState({});
  const [esNino, setEsNino] = useState({}); 
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Función de utilidad para identificar si una cadena es un nombre real
  const esNombreReal = (nombre) => {
    if (!nombre) return false;
    const limpio = nombre.trim().toLowerCase();
    const prefijosInvalidos = ["familia", "famlia", "famila", "fmlia"]; 
    const esInvalido = prefijosInvalidos.some(p => limpio.startsWith(p));
    return limpio !== "" && !esInvalido;
  };

  useEffect(() => {
    if (invitadoData && Object.keys(acompañantesAsistiran).length === 0) {
      const checks = {};
      const ninosInitial = {}; 

      if (invitadoData.acompañantes) {
        invitadoData.acompañantes.split(',').forEach(nom => {
          const nombreLimpio = nom.trim();
          if (esNombreReal(nombreLimpio)) {
            checks[nombreLimpio] = true;
            ninosInitial[nombreLimpio] = false;
          }
        });
      }
      
      setAcompañantesAsistiran(checks);
      setEsNino(ninosInitial);
    }
  }, [invitadoData]);

  const handleCheckChange = (nombre) => {
    setAcompañantesAsistiran(prev => ({ ...prev, [nombre]: !prev[nombre] }));
  };

  // --- LÓGICA DE VALIDACIÓN ---
  
  const invitadosSeleccionados = Object.keys(acompañantesAsistiran).filter(
    nombre => acompañantesAsistiran[nombre]
  );

  const numNinos = invitadosSeleccionados.filter(n => esNino[n]).length;
  const numAdultos = invitadosSeleccionados.length - numNinos;

  // Bloqueo: si dice que Sí, debe haber al menos 1 seleccionado Y al menos 1 adulto
  const faltaAdulto = asistenciaGlobal === "Sí" && invitadosSeleccionados.length > 0 && numAdultos === 0;
  const esInvalido = !asistenciaGlobal || 
                     (asistenciaGlobal === "Sí" && invitadosSeleccionados.length === 0) ||
                     faltaAdulto;

  const getButtonText = () => {
    if (cargando) return "ENVIANDO...";
    if (asistenciaGlobal === "Sí") {
      if (invitadosSeleccionados.length === 0) return "SELECCIONA QUIÉN ASISTE";
      if (faltaAdulto) return "DEBE ASISTIR AL MENOS 1 ADULTO";
      return `¡CONFIRMAR ${invitadosSeleccionados.length} ASISTENTES!`;
    }
    return asistenciaGlobal === "No" ? "CONFIRMAR INASISTENCIA" : "CONFIRMAR ASISTENCIA";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (esInvalido) return;

    setCargando(true);

    const datosFormulario = {
      id: invitadoData?.id || "GENERICO",
      asistencia: asistenciaGlobal,
      nombresConfirmados: asistenciaGlobal === "Sí" ? invitadosSeleccionados.join(", ") : "Ninguno",
      adultosConfirmados: asistenciaGlobal === "Sí" ? numAdultos : 0,
      niñosConfirmados: asistenciaGlobal === "Sí" ? numNinos : 0,
      token: "MONIS2026_SECRET",
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        body: JSON.stringify(datosFormulario),
      });

      setEnviado(true);
      if (onSuccess) onSuccess(datosFormulario);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un detalle al enviar. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="form-seccion" id="rsvp">
      <div className={`form-card visible ${enviado ? 'form-enviado' : ''}`}>
        {!enviado ? (
          <div className="form-content">
            <div className="custom-header-invitacion">
                <h2 className="font-body txt-large">
                  {invitadoData ? invitadoData.nombre.toUpperCase() : "Confirmar asistencia"}
                </h2>
            </div>
            
            <p className="mensaje-intro txt-medium">
              {invitadoData 
                ? `Hemos reservado ${invitadoData.pasesTotales} pases para ti. Por favor confirma quiénes podrán asistir:`
                : "Por favor, confirma tu asistencia antes de la fecha límite."}
            </p>

            <form onSubmit={handleSubmit} className="rsvp-form-element">
              <div className="input-group">
                <label htmlFor="asistencia" className="txt-medium text-turquesa">¿PODRÁS ACOMPAÑARNOS?</label>
                <select
                  id="asistencia"
                  value={asistenciaGlobal}
                  onChange={(e) => setAsistenciaGlobal(e.target.value)}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Sí">Sí, con mucho gusto</option>
                  <option value="No">No podré asistir</option>
                </select>
              </div>

              {asistenciaGlobal === "Sí" && (
                <div className="contenedor-checks animate-fade">
                  <p className="label-personalizado">Selecciona a los asistentes y etíquetalos:</p>
                  <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '-10px', marginBottom: '15px', fontStyle: 'italic' }}>
      * Se consideran niños a menores de 11 años.
    </p>
                  
                  {/* ALERTA VISUAL SI FALTAN ADULTOS */}
                  {faltaAdulto && (
                    <p style={{ color: '#d32f2f', fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
                      ⚠️ Por seguridad, al menos un adulto debe acompañar a los niños.
                    </p>
                  )}

                  <div className="grid-checks">
                    {Object.keys(acompañantesAsistiran)
                      .filter(nombre => esNombreReal(nombre))
                      .map((nombre) => (
                      <div key={nombre} className="invitado-row-container">
                        <label className="checkbox-custom">
                          <input
                            type="checkbox"
                            checked={acompañantesAsistiran[nombre]}
                            onChange={() => handleCheckChange(nombre)}
                          />
                          <span className="checkmark"></span>
                          <span className="nombre-invitado">{nombre}</span>
                        </label>
                        
                        {acompañantesAsistiran[nombre] && (
                          <div className="selector-minimalista">
                            <span 
                              className={`opcion-txt ${!esNino[nombre] ? 'activo' : ''}`}
                              onClick={() => setEsNino(prev => ({ ...prev, [nombre]: false }))}
                            >
                              ADULTO
                            </span>
                            <span className="divisor">|</span>
                            <span 
                              className={`opcion-txt ${esNino[nombre] ? 'activo' : ''}`}
                              onClick={() => setEsNino(prev => ({ ...prev, [nombre]: true }))}
                            >
                              NIÑO
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="button-container">
                <button 
                  type="submit" 
                  disabled={cargando || esInvalido} 
                  className={`btn-rsvp ${asistenciaGlobal === 'No' ? 'btn-no' : ''} ${esInvalido ? 'btn-disabled' : ''}`}
                >
                  {getButtonText()}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mensaje-exito-contenedor">
            <span className="icono-exito">{asistenciaGlobal === "No" ? "💌" : "✨"}</span>
            <h2 className="mensaje-exito">
              {asistenciaGlobal === "No" ? "¡Gracias por avisarnos!" : "¡Nos vemos pronto!"}
            </h2>
            <p className="p-exito">
              {asistenciaGlobal === "No" ? "Te extrañaremos en la celebración." : "Tu respuesta ha sido registrada con éxito. 💛"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormularioRSVPpremium;