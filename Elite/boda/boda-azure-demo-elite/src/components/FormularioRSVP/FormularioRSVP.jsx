"use client";
import { useState, useEffect, Suspense } from "react";
import './Formulario.css';
import toast from "react-hot-toast"; 

const EVENTO_PERMITE_NINOS = true; 

const FormularioContent = () => {
  const MAPA_CODIGOS = {
    "1010": 1, "2020": 2, "3030": 3, "4040": 4, "5050": 5, "6060": 6, "7070" : 7
  };

  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [pasesTotales, setPasesTotales] = useState(0);
  const [codigoValidado, setCodigoValidado] = useState(false);

  const [form, setForm] = useState({
    asistencia: "",
    nombre: "", 
    personas: "0", 
    ninos: "0",    
    bebida: "",    
  });

  const [listaNombres, setListaNombres] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleValidarCodigo = () => {
    const pases = MAPA_CODIGOS[codigoIngresado];
    if (pases) {
      setPasesTotales(pases);
      setCodigoValidado(true);
      setErrorMsg("");
      toast.success(`Código correcto: ${pases} pases`, { icon: '🔑' });
      
      if (pases === 1) {
        setForm(prev => ({ ...prev, personas: "1", ninos: "0" }));
      }
    } else {
      setErrorMsg("Código no válido. Revisa tu invitación.");
      toast.error("Código incorrecto");
    }
  };

  useEffect(() => {
    let adultosCount = parseInt(form.personas) || 0;
    let ninosCount = EVENTO_PERMITE_NINOS ? (parseInt(form.ninos) || 0) : 0;
    const totalActual = adultosCount + ninosCount;

    if (totalActual > pasesTotales) {
        setErrorMsg(`Límite excedido (${pasesTotales} pases).`);
        return; 
    }
    
    setListaNombres(prev => {
      const nuevaLista = [];
      for (let i = 0; i < totalActual; i++) {
        const tipo = i < adultosCount ? "Adulto" : "Niño";
        let valorNombre = "";
        
        if (pasesTotales === 1 && i === 0) {
          valorNombre = form.nombre;
        } else {
          const mismoTipoEnPrev = prev.filter(p => p.tipo === tipo);
          const indexEnTipo = i < adultosCount ? i : i - adultosCount;
          valorNombre = mismoTipoEnPrev[indexEnTipo]?.nombre || "";
        }
        
        nuevaLista.push({ nombre: valorNombre, tipo: tipo });
      }
      return nuevaLista;
    });
  }, [form.personas, form.ninos, form.nombre, pasesTotales]);

  useEffect(() => {
    if (form.asistencia === "No") {
      setErrorMsg("");
      return;
    }

    if (form.asistencia === "Sí" && codigoValidado) {
      const adultos = parseInt(form.personas) || 0;
      const ninosCount = parseInt(form.ninos) || 0;
      const total = adultos + ninosCount;

      if (form.nombre.trim().length < 3) {
        setErrorMsg("Escribe el nombre del titular o familia.");
      } else if (total === 0) {
        setErrorMsg("Debes seleccionar al menos un invitado.");
      } else if (adultos === 0 && ninosCount > 0) {
        setErrorMsg("Debe asistir al menos un adulto responsable.");
      } else if (total > pasesTotales) {
        setErrorMsg(`Solo tienes ${pasesTotales} pases disponibles.`);
      } else if (listaNombres.some(inv => inv.nombre.trim().length < 3)) {
        setErrorMsg("Completa los nombres de todos los asistentes.");
      } else {
        setErrorMsg("");
      }
    }
  }, [form, pasesTotales, codigoValidado, listaNombres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "asistencia" && value === "No") {
      setForm({ ...form, asistencia: value, personas: "0", ninos: "0", bebida: "No asistirá" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNombreAsistenteChange = (index, value) => {
    const nuevaLista = [...listaNombres];
    nuevaLista[index].nombre = value;
    setListaNombres(nuevaLista);
  };

  const eliminarPase = (index, tipo) => {
    if (tipo === "Adulto") {
        setForm(prev => ({ ...prev, personas: (Math.max(0, parseInt(prev.personas) - 1)).toString() }));
    } else {
        setForm(prev => ({ ...prev, ninos: (Math.max(0, parseInt(prev.ninos) - 1)).toString() }));
    }
    toast.success("Invitado removido");
  };

  const obtenerTextoBoton = () => {
    if (cargando) return "ENVIANDO...";
    if (form.asistencia === "") return "SELECCIONA UNA OPCIÓN";
    if (form.asistencia === "No") return "AVISAR QUE NO PUEDO IR";
    if (errorMsg) return "CORREGIR DATOS";
    return "¡SÍ, ALLÁ NOS VEMOS!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMsg || form.asistencia === "" || form.nombre.trim().length < 3) return;
    
    setCargando(true);
    try {
      const nombresFinales = pasesTotales === 1 
        ? `${form.nombre.trim()} (Adulto)` 
        : listaNombres.map(inv => `${inv.nombre.trim()} (${inv.tipo})`).join(", ");

      const formData = {
        ...form,
        nombre: form.nombre.trim(),
        bebida: nombresFinales, 
        pasesOriginales: pasesTotales, 
        codigoUsado: codigoIngresado,
        token: "MONIS2026_SECRET" 
      };

      await fetch("https://script.google.com/macros/s/AKfycbzS8uTLkPNhYBLjH8dGuCnEVtELed55g_TIzBz8Y00BKxMlrzrFdkatav8c9-W35oN4/exec", 
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
        }
      );
      toast.success("¡Respuesta enviada! 💛");
      setEnviado(true);
    } catch (error) {
      toast.error("Error al enviar.");
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <div className="form-card mensaje-exito-contenedor visible fade-in" id="rsvp">
        <span className="icono-exito">✨</span>
        <h2 className="mensaje-exito">
          {form.asistencia === "No" ? "Te extrañaremos" : "¡Confirmado!"}
        </h2>
        <p className="success-p">Tu respuesta ha sido registrada. ¡Gracias!</p>
      </div>
    );
  }

  return (
    <div className="form-card visible fade-in" id="rsvp">
      <p className="titulo">CONFIRMAR ASISTENCIA</p>
      
      {!codigoValidado ? (
        <div className="seccion-codigo">
          <p className="mensaje-intro">Ingresa tu código de acceso</p>
          <div className="input-group-codigo">
            <input 
              type="text" 
              maxLength="4"
              placeholder="0000"
              value={codigoIngresado}
              onChange={(e) => setCodigoIngresado(e.target.value.replace(/\D/g, ""))}
              className="input-codigo"
            />
            <button 
              type="button" 
              className="btn-validar" 
              onClick={handleValidarCodigo}
              disabled={codigoIngresado.length < 4}
            >
              VALIDAR
            </button>
          </div>
          {errorMsg && <p className="error-aviso">{errorMsg}</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="fade-in">
          <div className="badge-pases">
            ¡Tienes <b>{pasesTotales} {pasesTotales === 1 ? 'pase disponible' : 'pases disponibles'}</b>!
          </div>

          <div className="input-block">
            <label>¿Asistirás al evento?</label>
            <select name="asistencia" value={form.asistencia} onChange={handleChange} required>
              <option value="">Selecciona una opción</option>
              <option value="Sí">Sí, ¡con gusto!</option>
              <option value="No">No podré asistir</option>
            </select>
          </div>

          <div className="input-block">
            <label>{pasesTotales === 1 ? "Tu Nombre Completo" : "Nombre de la Familia"}</label>
            <input 
              type="text" 
              name="nombre" 
              placeholder={pasesTotales === 1 ? "Ej: Valeria García" : "Ej: Familia Vega Torres"} 
              className="input-estilo" 
              value={form.nombre} 
              onChange={handleChange} 
              required 
            />
          </div>

          {form.asistencia === "Sí" && pasesTotales > 1 && (
            <div className="contenedor-dinamico fade-in">
              <span className="label-personalizado">Distribución de pases</span>
              <div className="grid-pases">
                <div className="input-block">
                  <label>Adultos</label>
                  <select name="personas" value={form.personas} onChange={handleChange}>
                    {[...Array(pasesTotales + 1).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                {EVENTO_PERMITE_NINOS && (
                  <div className="input-block">
                    <label>Niños</label>
                    <select name="ninos" value={form.ninos} onChange={handleChange}>
                      {[...Array(pasesTotales + 1).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {listaNombres.length > 0 && (
                <div className="lista-asistentes-inputs fade-in">
                  <span className="label-personalizado">Nombres de tus invitados</span>
                  {listaNombres.map((inv, index) => (
                    <div key={index} className="input-container-modern">
                      <input 
                        type="text"
                        placeholder={`Nombre del ${inv.tipo}`}
                        className="input-estilo-modern"
                        value={inv.nombre}
                        onChange={(e) => handleNombreAsistenteChange(index, e.target.value)}
                        required
                      />
                      <div className="input-addons">
                        <button 
                          type="button" 
                          className="btn-x-eliminar" 
                          onClick={() => eliminarPase(index, inv.tipo)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {errorMsg && <p className="error-aviso">{errorMsg}</p>}

          <button 
            type="submit" 
            disabled={cargando || (form.asistencia === "Sí" && !!errorMsg) || form.asistencia === "" || form.nombre.trim().length < 3} 
            className="btn-rsvp"
          >
            {obtenerTextoBoton()}
          </button>
        </form>
      )}
    </div>
  );
};

const FormularioRSVP = () => {
  return (
    <section className="form-seccion">
      <Suspense fallback={<div>Cargando...</div>}>
        <FormularioContent />
      </Suspense>
    </section>
  );
};

export default FormularioRSVP;