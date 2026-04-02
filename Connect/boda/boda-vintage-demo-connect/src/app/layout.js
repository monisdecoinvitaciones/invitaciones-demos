// app/layout.js
import { 
  Cormorant_Garamond, 
  Birthstone, 
  Montserrat, 
  Mea_Culpa, 
  Monsieur_La_Doulaise 
} from 'next/font/google';
import "./globals.css";

// 1. Tipografía Serif para cuerpos de texto (Elegante y legible)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500'],
  variable: '--font-cormorant',
});

// 2. Tipografía Cursiva (Opción Birthstone - Delgada)
const birthstone = Birthstone({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-birthstone',
});

// 3. Tipografía Sans-Serif para botones y tags (Minimalista)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-montserrat',
});

// 4. Tipografía Cursiva (Opción Mea Culpa - Ultra delgada y artística)
const meaCulpa = Mea_Culpa({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mea',
});

// 5. Tipografía Cursiva (Opción Monsieur - Lujo silencioso)
const monsieur = Monsieur_La_Doulaise({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-monsieur',
});

export const metadata = {
  title: "Demo Boda Connection Plus",
  description: "Demo Boda | Diseño por Invimon",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body 
        className={`
          ${cormorant.variable} 
          ${birthstone.variable} 
          ${montserrat.variable} 
          ${meaCulpa.variable} 
          ${monsieur.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}