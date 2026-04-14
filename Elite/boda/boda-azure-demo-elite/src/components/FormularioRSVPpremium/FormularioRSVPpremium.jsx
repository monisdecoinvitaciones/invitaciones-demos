"use client";
import { useState, useEffect } from "react";
import './FormularioRSVPpremium.css';
import toast from "react-hot-toast";

// IMPORTAMOS FIREBASE
import { db } from "../../app/firebaseClient";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

// Añadimos fechaLimite a las props
const FormularioRSVPpremium = ({ invitadoData, bodaId, onSuccess, fechaLimite }) => {
  const [asistenciaGlobal, setAsistenciaGlobal] = useState("");
  const [listaInvitados, setListaInvitados] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [admiteNinos, setAdmiteNinos] = useState(true);

  const esNombreReal = (nombre) => {
    if (!nombre) return false;
    const limpio = nombre.trim().toLowerCase();
    const prefijosInvalidos = ["familia", "famlia", "famila", "fmlia"];
    const esInvalido = prefijosInvalidos.some(p => limpio.startsWith(p));
    return limpio !== "" && !esInvalido;
  };

  useEffect(() => {
    const obtenerConfigBoda = async () => {
      try {
        const bodaRef = doc(db, "bodas", bodaId);
        const bodaSnap = await getDoc(bodaRef);
        if (bodaSnap.exists()) {
          const config = bodaSnap.data().config;
          setAdmiteNinos(config?.admiteNinos === true);
        }
      } catch (error) {
        console.error("Error cargando config de boda:", error);
      }
    };
    if (bodaId) obtenerConfigBoda();
  }, [bodaId]);

  useEffect(() => {
    if (invitadoData && listaInvitados.length === 0) {
      let inicial = [];
      if (invitadoData.invitados && Array.isArray(invitadoData.invitados)) {
        invitadoData.invitados.forEach((inv, i) => {
          const tieneNombreValido = esNombreReal(inv.nombre);
          inicial.push({
            id: `inv-${i}`,
            nombre: tieneNombreValido ? inv.nombre : "",
            asiste: tieneNombreValido, 
            esNino: inv.rol === "Niño",
            editable: !tieneNombreValido 
          });
        });
      }
      setListaInvitados(inicial);
    }
  }, [invitadoData, listaInvitados.length]);

  const toggleAsistencia = (id) => {
    setListaInvitados(prev => prev.map(inv =>
      inv.id === id ? { ...inv, asiste: !inv.asiste } : inv
    ));
  };

  const manejarCambioNombre = (id, nuevoNombre) => {
    setListaInvitados(prev => prev.map(inv =>
      inv.id === id ? { ...inv, nombre: nuevoNombre } : inv
    ));
  };

  const manejarCambioRol = (id, ninoValor) => {
    setListaInvitados(prev => prev.map(inv =>
      inv.id === id ? { ...inv, esNino: ninoValor } : inv
    ));
  };

  const invitadosMarcados = listaInvitados.filter(inv => inv.asiste);
  const invitadosConfirmados = listaInvitados.filter(inv => inv.asiste && inv.nombre.trim() !== "");
  const nombresIncompletos = listaInvitados.some(inv => inv.asiste && inv.nombre.trim() === "");
  const numNinos = invitadosConfirmados.filter(n => n.esNino).length;
  const numAdultos = invitadosConfirmados.length - numNinos;
  const faltaAdulto = asistenciaGlobal === "Sí" && invitadosConfirmados.length > 0 && numAdultos === 0;
  
  const esInvalido = !asistenciaGlobal || 
                      (asistenciaGlobal === "Sí" && invitadosMarcados.length === 0) || 
                      nombresIncompletos ||
                      faltaAdulto;

  const getButtonText = () => {
    if (cargando) return "ENVIANDO...";
    if (asistenciaGlobal === "Sí") {
      if (invitadosMarcados.length === 0) return "SELECCIONA QUIÉN ASISTE";
      if (nombresIncompletos) return "ESCRIBE LOS NOMBRES FALTANTES";
      if (faltaAdulto) return "DEBE ASISTIR AL MENOS 1 ADULTO";
      const cantidad = invitadosConfirmados.length;
      return cantidad === 1 ? `¡CONFIRMAR ${cantidad} ASISTENTE!` : `¡CONFIRMAR ${cantidad} ASISTENTES!`;
    }
    return asistenciaGlobal === "No" ? "CONFIRMAR INASISTENCIA" : "CONFIRMAR ASISTENCIA";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (esInvalido) return;
    setCargando(true);

    try {
      const docRef = doc(db, "bodas", bodaId, "invitados", invitadoData.id);
      
      const invitadosFinales = listaInvitados.map(inv => {
        const confirmaAsistir = asistenciaGlobal === "Sí" && inv.asiste;
        return {
          nombre: inv.nombre.trim() || (invitadoData.nombreFamilia || "Invitado"),
          rol: inv.esNino ? "Niño" : "Adulto",
          asistencia: confirmaAsistir ? "Sí" : "No",
          confirmado: confirmaAsistir
        };
      });

      const datosParaFirebase = {
        asistencia: asistenciaGlobal,
        invitados: invitadosFinales,
        adultos: asistenciaGlobal === "Sí" ? numAdultos : 0,
        ninos: asistenciaGlobal === "Sí" ? numNinos : 0,
        totalConfirmados: asistenciaGlobal === "Sí" ? invitadosConfirmados.length : 0,
        fechaConfirmacion: serverTimestamp(),
      };

      await updateDoc(docRef, datosParaFirebase);
      
      if (asistenciaGlobal === "No") {
        toast.success("Respuesta registrada. ¡Gracias por avisar! 💌");
      } else {
        toast.success("¡Confirmación exitosa! Nos vemos pronto. ✨");
      }

      setEnviado(true);
      if (onSuccess) onSuccess(datosParaFirebase);

    } catch (error) {
      console.error("Error Firebase:", error);
      toast.error("Ocurrió un error al guardar tu respuesta.");
    } finally {
      setCargando(false);
    }
  };

  const mostrarSelectorNinos = admiteNinos && (invitadoData?.pasesIniciales > 1);

  return (
    <section className="form-seccion" id="rsvp">
      <div className={`form-card visible ${enviado ? 'form-enviado' : ''}`}>
        {!enviado ? (
          <div className="form-content">
            <div className="custom-header-invitacion">
              <h2 className="font-body txt-large">
                {invitadoData ? invitadoData.nombre.toUpperCase() : "Confirmar asistencia"}
              </h2>
              <br></br>
            </div>

            {/* SECCIÓN FECHA LÍMITE DINÁMICA */}
            {fechaLimite && (
              <div className="container-fecha-limite">
                <p className="txt-fecha-limite">Confirmar antes del {fechaLimite}</p>
              </div>
            )}

            <p className="mensaje-intro txt-medium">
              {invitadoData?.pasesIniciales 
                ? `Hemos reservado ${invitadoData.pasesIniciales} ${invitadoData.pasesIniciales === 1 ? 'pase para ti' : 'pases para ti'}. Por favor selecciona quiénes asisten:`
                : "Confirma tu asistencia:"}
            </p>

            <form onSubmit={handleSubmit} className="rsvp-form-element">
              <div className="input-group">
                <label htmlFor="asistencia" className="txt-medium">¿PODRÁS ACOMPAÑARNOS?</label>
                <br></br>
                <select id="asistencia" value={asistenciaGlobal} onChange={(e) => setAsistenciaGlobal(e.target.value)} required>
                  <option value="">Selecciona una opción</option>
                  <option value="Sí">Sí, con mucho gusto</option>
                  <option value="No">No podré asistir</option>
                </select>
              </div>

              {asistenciaGlobal === "Sí" && (
                <div className="contenedor-checks animate-fade">
                  <p className="label-personalizado">
                    {listaInvitados.length === 1 
                      ? "Confirma al asistente:" 
                      : admiteNinos 
                        ? "Selecciona a los asistentes y etíquetalos:" 
                        : "Selecciona a los asistentes:"}
                  </p>
                  
                  {faltaAdulto && <p className="error-adulto">⚠️ Se requiere al menos un adulto.</p>}

                  <div className="grid-checks">
                    {listaInvitados.map((inv) => (
                      <div key={inv.id} className={`invitado-row-container ${!inv.asiste ? 'opacidad-baja' : ''}`}>
                        <div className="checkbox-y-nombre">
                          <label className="checkbox-custom">
                            <input type="checkbox" checked={inv.asiste} onChange={() => toggleAsistencia(inv.id)} />
                            <span className="checkmark"></span>
                          </label>

                          <div className="zona-texto-invitado">
                            {inv.editable && inv.asiste ? (
                              <div className="nombre-editable-container" onClick={(e) => e.stopPropagation()}>
                                <input 
                                  type="text"
                                  placeholder="Escribe nombre..."
                                  className={`input-nombre-invitado-live ${inv.asiste && inv.nombre.trim() === "" ? "input-vacio" : ""}`}
                                  value={inv.nombre}
                                  onChange={(e) => manejarCambioNombre(inv.id, e.target.value)}
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <span className="nombre-invitado">
                                {inv.nombre || "Acompañante"}
                              </span>
                            )}
                          </div>
                        </div>

                        {inv.asiste && inv.nombre.trim() !== "" && mostrarSelectorNinos && (
                          <div className="selector-minimalista">
                            <span className={`opcion-txt ${!inv.esNino ? 'activo' : ''}`} onClick={() => manejarCambioRol(inv.id, false)}>ADULTO</span>
                            <span className="divisor">|</span>
                            <span className={`opcion-txt ${inv.esNino ? 'activo' : ''}`} onClick={() => manejarCambioRol(inv.id, true)}>NIÑO</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {mostrarSelectorNinos && (
                    <p className="leyenda-ninos" style={{ fontSize: '0.75rem', marginTop: '15px', opacity: 0.7, fontStyle: 'italic', textAlign: 'center' }}>
                      * Se consideran niños a menores de 11 años. Mayores de 2 años requieren menú infantil/asiento.
                    </p>
                  )}
                </div>
              )}

              <div className="button-container">
                <button type="submit" disabled={cargando || esInvalido} className={`btn-rsvp ${asistenciaGlobal === 'No' ? 'btn-no' : ''} ${esInvalido ? 'btn-disabled' : ''}`}>
                  {getButtonText()}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mensaje-exito-contenedor">
            <span className="icono-exito">{asistenciaGlobal === "No" ? "💌" : "✨"}</span>
            <h2 className="mensaje-exito">{asistenciaGlobal === "No" ? "¡Gracias por avisarnos!" : "¡Nos vemos pronto!"}</h2>
            <p className="p-exito">Respuesta registrada con éxito. 💛</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormularioRSVPpremium;