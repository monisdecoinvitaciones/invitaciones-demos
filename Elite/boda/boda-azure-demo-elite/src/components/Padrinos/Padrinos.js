"use client";
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import './Padrinos.css';

const Padrinos = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Imágenes actualizadas con las rutas locales de /public
  const padrinos = [
    { 
      id: 1, 
      name: "Roberto & Elena", 
      role: "Padrinos de Velación", 
      img: "/padrinos/velacion.jpg" 
    },
    { 
      id: 2, 
      name: "Ricardo & Patricia", 
      role: "Padrinos de Arras", 
      img: "/padrinos/arras.jpg" 
    },
    { 
      id: 3, 
      name: "Sofía Martínez", 
      role: "Madrina de Anillos", 
      img: "/padrinos/madrina.jpg" 
    }
  ];

  return (
    <section className="padrinos-section" id="padrinos">
      <div className="padrinos-container">
        
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[EffectFade, Autoplay, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          navigation={true}
          autoHeight={true} 
          watchSlidesProgress={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="padrinos-swiper"
        >
          {padrinos.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="padrino-item">
                <div className="padrino-content">
                  <span className="padrino-label">Nuestra Corte</span>
                  <h3 className="padrino-name">{p.name}</h3>
                  <p className="padrino-role">{p.role}</p>
                </div>

                <div className="padrino-visual">
                  <div className="image-frame">
                    <div className="blob-bg"></div>
                    {/* Renderizado de imagen local */}
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="padrino-img" 
                      loading="lazy" 
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegación interactiva */}
        <div className="swiper-pagination-custom">
          {padrinos.map((_, index) => (
            <button 
              key={index} 
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`padrino-dot ${activeIndex === index ? 'active' : ''}`}
              aria-label={`Ver padrino ${index + 1}`}
            >
              0{index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Padrinos;