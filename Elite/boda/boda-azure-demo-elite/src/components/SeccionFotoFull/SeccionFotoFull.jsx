"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// IMPORTANTE: Solo cargamos el CSS base esencial
import "swiper/css";
import "./SeccionFotoFull.css";

const SeccionFotoFull = () => {
  const fotos = [
    "/boda5/optimized/boda1.webp",
    "/boda5/optimized/boda2.webp",
    "/boda5/optimized/boda3.webp",
    "/boda5/optimized/boda4.webp",
    "/boda5/optimized/boda5.webp",
    "/boda5/optimized/boda6.webp",
  ];

  return (
    <section className="seccion-galeria-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0} 
        loop={true}
        speed={1200} // Velocidad del desplazamiento lateral
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // Forzamos el comportamiento de "empuje" horizontal
        grabCursor={true}
        allowTouchMove={true} 
        watchSlidesProgress={true}
        className="galeria-swiper"
      >
        {fotos.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              {/* Marco Grande - Minimalista puro */}
              <div className="marco-artistico principal">
                <img src={src} className="img-galeria-full" alt="Boda principal" />
              </div>

              {/* Marco Pequeño - Sincronizado en el mismo slide */}
              <div className="marco-artistico secundario">
                <img src={src} className="img-galeria-full" alt="Boda detalle" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SeccionFotoFull;