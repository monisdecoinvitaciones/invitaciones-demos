import HeroBautizo from "./components/HeroBautizo/HeroBautizo";
import FraseBautizo from "./components/FraseBautizo/FraseBautizo";
import FamilySection from "./components/FamilySection/FamilySection";
import Countdown from "./components/Countdown/Countdown";
import HeroFoto from "./components/HeroFoto/HeroFoto.";
import QuoteSection from "./components/QuoteSection/QuoteSection";
import LocationSection from "./components/LocationSection/LocationSection";
import DressCode from "./components/DressCode/DressCode";
import Galeria from "./components/Galeria/Galeria";
import DateSection from "./components/DateSection/DateSection";
import RSVPSection from "./components/RSVPSection/RSVPSection";
import MesaRegalos from "./components/MesaRegalos/MesaRegalos";
import FooterInvimon from "./components/FooterInvimon/FooterInvimon";
import Musica from "./components/Musica/Musica";
import BotonInicio from "./components/BotonInicio/BotonInicio";
import WelcomeSection from "./components/WelcomeSection/WelcomeSection";
import HashtagSection from "./components/HashtagSection/HashtagSection";

export default function Page() {
  return (
    <>
    <audio id="audioPrincipal" loop preload="auto">
        <source src="/musica.m4a" type="audio/mp4" />
      </audio>
      <HeroBautizo />
      <FraseBautizo />
      <WelcomeSection/>
      
      <HeroFoto/>
      <DateSection/>
      <LocationSection/>
      <DressCode/>
      <Galeria/>
      <MesaRegalos/>
      <HashtagSection/>
      <RSVPSection/>
     <Countdown/> 
     
     <QuoteSection/>
     <BotonInicio/>
     <FooterInvimon/>
     <Musica/>
     
     
    </>
  );
}