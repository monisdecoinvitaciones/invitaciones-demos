const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- RUTAS ABSOLUTAS ---
// Usamos la ruta exacta que me pasaste
const inputDir = 'C:\\Users\\valer\\Downloads\\invitacion-pro\\digital-invite\\public\\Boda1';
const outputDir = 'C:\\Users\\valer\\Downloads\\invitacion-pro\\digital-invite\\public\\Boda1\\optimized';

// 1. Verificar si la carpeta de origen existe
if (!fs.existsSync(inputDir)) {
    console.error(`❌ ERROR: No se encontró la carpeta en: ${inputDir}`);
    process.exit(1);
}

// 2. Crear carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Carpeta de salida creada: ${outputDir}`);
}

// 3. Extensiones a procesar
const extensions = ['.png', '.jpg', '.jpeg'];

// 4. Proceso de conversión
console.log('🚀 Iniciando conversión...');

fs.readdirSync(inputDir).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    
    if (extensions.includes(ext)) {
        const inputPath = path.join(inputDir, file);
        const outputName = path.parse(file).name + '.webp';
        const outputPath = path.join(outputDir, outputName);

        sharp(inputPath)
            .webp({ quality: 80 }) // Compresión óptima para web
            .toFile(outputPath)
            .then(info => {
                console.log(`✅ ${file} -> ${outputName} (${(info.size / 1024).toFixed(2)} KB)`);
            })
            .catch(err => {
                console.error(`❌ Error con ${file}:`, err.message);
            });
    }
});