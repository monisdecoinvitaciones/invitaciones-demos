"use client";

import { useEffect } from "react";

const ClimaWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://app3.weatherwidget.org/js/?id=ww_62f2dc5cd2c95";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="clima-seccion">
      <div
        id="ww_62f2dc5cd2c95"
        v="1.3"
        loc="id"
        a='{"t":"responsive","lang":"es","sl_lpl":1,"ids":["wl6025"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","cl_odd":"#00000000"}'
      >
      </div>
    </section>
  );
};

export default ClimaWidget;
