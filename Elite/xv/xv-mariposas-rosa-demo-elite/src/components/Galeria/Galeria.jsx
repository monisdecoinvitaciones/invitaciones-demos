"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import 'swiper/css/effect-coverflow';
import './Galeria.css';

const Galeria = () => {
  const fotos = Array.from({ length: 12 }, (_, i) => `/xv3/optimized/xv${i + 1}.webp`);

  return (
    <section className="galeria-section" id='galeria'>
      <div className="galeria-header">
        <span className="galeria-subtitle">MIS MEJORES MOMENTOS</span>
        <h2 className="galeria-title">Galería de fotos</h2>
        <div className="galeria-divider"></div>
      </div>

      <div className="galeria-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ 
            clickable: true, 
            dynamicBullets: false 
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {fotos.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <img src={src} alt={`Foto ${index + 1}`} loading="lazy" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Galeria;