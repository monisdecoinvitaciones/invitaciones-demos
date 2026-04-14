import { 
  Cormorant_Garamond, 
  Birthstone, 
  Montserrat, 
  Mea_Culpa, 
  Monsieur_La_Doulaise 
} from 'next/font/google';
import "./globals.css";

// 1. Tipografía Serif para cuerpos de texto (Elegante y clásica)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
});

// 2. Tipografía Cursiva (Estilo caligráfico suave)
const birthstone = Birthstone({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-birthstone',
});

// 3. Tipografía Sans-Serif para datos técnicos (Hora, ubicación, botones)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-montserrat',
});

// 4. Tipografía Mea Culpa (La usaremos para los títulos principales de secciones)
const meaCulpa = Mea_Culpa({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mea',
});

// 5. Monsieur La Doulaise (Perfecta para el nombre de la quinceañera en el sobre)
const monsieur = Monsieur_La_Doulaise({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-monsieur',
});

export const metadata = {
  title: "Mis XV Años | Tiana Theme",
  description: "Invitación Digital - Diseño por Invimon",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body 
        className={`
          ${cormorant.variable} 
          ${birthstone.variable} 
          ${montserrat.variable} 
          ${meaCulpa.variable} 
          ${monsieur.variable}
          antialiased
        `}
        style={{ backgroundColor: '#fdfaf0' }} // Color crema de fondo por defecto
      >
        {children}
      </body>
    </html>
  );
}