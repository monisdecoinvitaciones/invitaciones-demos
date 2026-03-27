/** @type {import('next').NextConfig} */
const nextConfig = {
  // CORRECTO: Va afuera de experimental en versiones nuevas
  allowedDevOrigins: ['192.168.100.93:3001'],
  
  /* Si tienes otras cosas como imágenes o experimental, déjalas abajo */
  experimental: {
    // Aquí ya no pongas el allowedDevOrigins
  }
};

export default nextConfig;