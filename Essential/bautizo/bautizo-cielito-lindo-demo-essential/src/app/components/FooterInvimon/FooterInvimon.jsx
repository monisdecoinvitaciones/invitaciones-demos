"use client";
import React from "react";
import "./FooterInvimon.css";

const FooterInvimon = () => {
  const handleClick = () => {
    window.open("https://invimon.com", "_blank");
  };

  return (
    <footer className="invimon-footer-full" onClick={handleClick}>
      <div className="footer-inner">

        <div className="footer-line"></div>

        <p className="footer-text">
        INVIMON · Invitaciones Digitales
        </p>

        <div className="footer-line"></div>

      </div>
    </footer>
  );
};

export default FooterInvimon;