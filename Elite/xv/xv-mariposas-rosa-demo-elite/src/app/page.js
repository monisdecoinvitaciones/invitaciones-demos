"use client"; // Muy importante para usar useAnimations()
import { useAnimations } from "@/hooks/useAnimations";
import Sobre from "@/components/Sobre/Sobre";
import Hero from "@/components/Hero/Hero";
import Musica from "@/components/Musica/Musica";
import NavbarInvitacion from "@/components/NavbarInvitacion/NavbarInvitacion";
import Sobre2 from "@/components/Sobre2/Sobre2";
import FooterInvimon from "@/components/FooterInvimon/FooterInvimon";

import Presentacion from "../components/Presentacion/Presentacion";
import Ubicaciones from "../components/Ubicaciones/Ubicaciones";
import Countdown from "../components/Countdown/Countdown";
import Frase from "../components/Frase/Frase";
import Itinerario from "../components/Itinerario/Itinerario";
import Galeria from "../components/Galeria/Galeria";
import MesaRegalos from "../components/MesaRegalos/MesaRegalos";
import VestimentaInteractiva from "../components/VestimentaInteractiva/VestimentaInteractiva";
import Hashtag from "../components/Hashtag/Hashtag";
import Amenidades from "../components/Amenidades/Amenidades";
import FormularioRSVP from "../components/FormularioRSVP/FormularioRSVP"
import Hospedaje from "../components/Hospedaje/Hospedaje";
import ContactoNovios1 from "../components/ContactoNovios1/ContactoNovios1";
import Despedida from "../components/Despedida/Despedida";
import SaveTheDate from "../components/SaveTheDate/SaveTheDate";
import SeccionFotoFull from "../components/SeccionFotoFull/SeccionFotoFull";

import FraseSection from "../components/FraseSection/FraseSection"
import FamilySection from "../components/FamilySection/FamilySection";
import FriendsSection from "../components/FriendsSection/FriendsSection";
import PinterestBoard2 from "../components/PinterestBoard2/PinterestBoard2"
import DressCode from "../components/DressCode/DressCode"
import AvisoImportante from "../components/AvisoImportante/AvisoImportante";

import InvitacionPage from "../components/InvitacionPage/InvitacionPage";
import Firmas from "../components/Firmas/Firmas"

import MusicBar from"../components/MusicBar/MusicBar";
import MenuFlotante from "../components/MenuFlotante/MenuFlotante";

export default function Page() {
  // Activamos todas las animaciones de scroll y zoom
  useAnimations();

  return (
    <main>

      {/* AUDIO GLOBAL */}
      <audio id="audioPrincipal" loop preload="auto">
        <source src="/cancion.m4a" type="audio/mp4" />
      </audio>

      {/* 1. SOBRE PANTALLA COMPLETA */}
      <Sobre2 />

{/*BARRA SUPERIOR DE MUSICA <MusicBar/>*/}
      


      {/*<MenuFlotante />*/}
      <MenuFlotante/>

      {/* 2. HERO */}
      <Hero />
     

      {/* 3. FRASE 
      <section className="frase txt-medium">
        <p className="txt-medium">"El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección."</p>
      </section>*/}

      <FraseSection/>
       <Countdown/>
       <FamilySection/>
       <SeccionFotoFull/>
       <FriendsSection/>

      <Ubicaciones/>
      <Itinerario/>
      <Galeria/>
      <MesaRegalos/>
      <DressCode/>
      <PinterestBoard2/>
      
      <Hashtag/>
      <Hospedaje/>
      <AvisoImportante/>
      <InvitacionPage/>
      <ContactoNovios1/>
      <SaveTheDate/>

      <Firmas/>
      <Despedida/>
    
      
      <MusicBar/>
      <FooterInvimon/>
     
    </main>
  );
}