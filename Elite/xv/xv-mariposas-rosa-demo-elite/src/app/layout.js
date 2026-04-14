// app/layout.js
import { 
  Cormorant_Garamond, 
  Birthstone, 
  Mea_Culpa, 
  Monsieur_La_Doulaise 
} from 'next/font/google';
import "./globals.css";

// 1. Tipografía Serif principal (Cuerpos de texto, botones y subtítulos)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
});

// 2. Tipografía Cursiva (Opción Birthstone)
const birthstone = Birthstone({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-birthstone',
});

// 3. Tipografía Cursiva (Opción Mea Culpa)
const meaCulpa = Mea_Culpa({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mea',
});

// 4. Tipografía Cursiva (Opción Monsieur)
const monsieur = Monsieur_La_Doulaise({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-monsieur',
});

export const metadata = {
  title: "Demo XV Rosa Elite Pro",
  description: "Demo XV | Diseño por Invimon",
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