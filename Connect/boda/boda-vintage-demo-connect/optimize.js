const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Configura aquí tus carpetas
const inputFolder = './public/Boda4'; // Carpeta con tus fotos originales
const outputFolder = './public/Boda4/optimized'; // Donde se guardarán las nuevas

// Crear la carpeta de salida si no existe
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// 2. Leer los archivos
fs.readdirSync(inputFolder).forEach(file => {
    const filePath = path.join(inputFolder, file);
    
    // Solo procesar imágenes (jpg, jpeg, png)
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const outputName = file.split('.')[0] + '.webp';
        
        sharp(filePath)
            .resize(1200) // Redimensiona a un ancho máximo de 1200px (suficiente para web)
            .webp({ quality: 80 }) // Convierte a WebP con 80% de calidad
            .toFile(path.join(outputFolder, outputName))
            .then(() => console.log(`✅ Optimizado: ${outputName}`))
            .catch(err => console.error(`❌ Error en ${file}:`, err));
    }
});