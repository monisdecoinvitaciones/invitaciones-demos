"use client";
import './Clima.css';
import { useEffect, useState } from "react";

const Clima = () => {
  const [forecast, setForecast] = useState(null);
  const [diaActual, setDiaActual] = useState(0);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=20.6244&longitude=-103.2425&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=America/Mexico_City&models=ecmwf_ifs"
    )
      .then((res) => res.json())
      .then((data) => {
        setForecast(data);

        const hoy = new Date().toISOString().split("T")[0];
        const indiceHoy = data.daily.time.findIndex((d) => d === hoy);
        setDiaActual(indiceHoy !== -1 ? indiceHoy : 0);
      });
  }, []);

  const cambiarDia = (direccion) => {
    setAnimar(true);
    setTimeout(() => {
      setDiaActual((prev) => {
        if (direccion === "next") {
          return prev < forecast.daily.time.length - 1 ? prev + 1 : 0;
        } else {
          return prev > 0 ? prev - 1 : forecast.daily.time.length - 1;
        }
      });
      setAnimar(false);
    }, 300);
  };

  const obtenerIcono = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 99) return "⛈️";
    return "☁️";
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  if (!forecast) {
    return (
      <section className="clima-seccion">
        <p className="loading">Consultando clima...</p>
      </section>
    );
  }

  const fecha = forecast.daily.time[diaActual];
  const max = forecast.daily.temperature_2m_max[diaActual];
  const min = forecast.daily.temperature_2m_min[diaActual];
  const lluvia = forecast.daily.precipitation_probability_max[diaActual];
  const weathercode = forecast.daily.weathercode[diaActual];

  return (
    <section className="clima-seccion">
      <div className="clima-contenido">
        <div className="clima-card">
          <button onClick={() => cambiarDia("prev")} className="nav">←</button>

          <div className={`clima-info ${animar ? "fade" : ""}`}>
            <p className="fecha">Tonalá</p>
            <p className="fecha">{formatearFecha(fecha)}</p>

            <div className="icono">{obtenerIcono(weathercode)}</div>

            <p className="temp-actual">{forecast.current.temperature_2m}°C ahora</p>
            <p className="temp">{max}° / {min}°</p>
            <p className="lluvia">Probabilidad de lluvia {lluvia}%</p>
          </div>

          <button onClick={() => cambiarDia("next")} className="nav">→</button>
        </div>
      </div>
    </section>
  );
};

export default Clima;
