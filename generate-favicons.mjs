import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'public');
const svgPath = join(publicDir, 'favicon.svg');

// Define all favicon sizes needed for optimal SEO and compatibility
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'apple-touch-icon-120x120.png', size: 120 },
  { name: 'apple-touch-icon-76x76.png', size: 76 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'mstile-70x70.png', size: 70 },
  { name: 'mstile-144x144.png', size: 144 },
  { name: 'mstile-150x150.png', size: 150 },
  { name: 'mstile-310x310.png', size: 310 },
];

async function generateFavicons() {
  console.log('🎨 Generating optimized favicons for SEO...\n');

  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(svgPath);

    // Generate all PNG sizes
    for (const { name, size } of sizes) {
      const outputPath = join(publicDir, name);

      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({
          quality: 100,
          compressionLevel: 9,
          adaptiveFiltering: true,
        })
        .toFile(outputPath);

      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-size ICO file)
    // ICO files need special handling - we'll create a 32x32 version as fallback
    const icoPath = join(publicDir, 'favicon.ico');
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(icoPath);

    console.log(`✓ Generated favicon.ico (32x32)`);

    console.log('\n✨ All favicons generated successfully!');
    console.log('\n📋 Generated files:');
    console.log('   - Standard favicons (16x16, 32x32, 48x48)');
    console.log('   - Apple touch icons (76x76 to 180x180)');
    console.log('   - Android Chrome icons (192x192, 512x512)');
    console.log('   - Microsoft tile icons (70x70 to 310x310)');
    console.log('   - Legacy favicon.ico');
    console.log('\n🚀 Your site is now optimized for all platforms and search engines!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();
