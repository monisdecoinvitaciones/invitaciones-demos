'use client';
import React, { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { FaInstagram, FaCopy, FaCheck } from 'react-icons/fa';
import './HashtagSection.css';

const HashtagSection = () => {
  const [ref, isVisible] = useReveal();
  const [copied, setCopied] = useState(false);
  const hashtag = "#BautizoMarianAndrea";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hashtag-section-bg">
      <div 
        ref={ref} 
        className={`hashtag-perspective-wrapper ${isVisible ? 'is-visible' : 'is-hidden'}`}
      >
        <div className="hashtag-card">
          <div className="hashtag-icon-circle">
            <FaInstagram />
          </div>
          
          <h2 className="hashtag-title">¡Comparte tus fotos!</h2>
          <p className="hashtag-subtitle">
            Ayúdanos a capturar cada momento especial usando nuestro hashtag oficial:
          </p>

          <div className="hashtag-box" onClick={copyToClipboard}>
            <span className="hashtag-text">{hashtag}</span>
            <button className="copy-btn">
              {copied ? <FaCheck className="icon-check" /> : <FaCopy />}
            </button>
            {copied && <span className="copy-toast">¡Copiado!</span>}
          </div>

          <p className="hashtag-footer-text">Presiona para copiar el hashtag</p>
        </div>

        <div className="hashtag-decor">
          <span className="ornament-line"></span>
          <span className="ornament-diamond">✦</span>
          <span className="ornament-line"></span>
        </div>
      </div>
    </section>
  );
};

export default HashtagSection;