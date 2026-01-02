#!/bin/bash
# Generate all favicon sizes from SVG for optimal SEO and compatibility

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Installing..."
    echo "Please install ImageMagick: sudo apt-get install imagemagick (Linux) or brew install imagemagick (Mac)"
    exit 1
fi

# Create public directory if it doesn't exist
mkdir -p public

# Generate PNG favicons in various sizes
echo "Generating favicons..."

# Standard favicon sizes
convert -background none public/favicon.svg -resize 16x16 public/favicon-16x16.png
convert -background none public/favicon.svg -resize 32x32 public/favicon-32x32.png
convert -background none public/favicon.svg -resize 48x48 public/favicon-48x48.png

# Apple Touch Icons
convert -background none public/favicon.svg -resize 180x180 public/apple-touch-icon.png
convert -background none public/favicon.svg -resize 152x152 public/apple-touch-icon-152x152.png
convert -background none public/favicon.svg -resize 120x120 public/apple-touch-icon-120x120.png
convert -background none public/favicon.svg -resize 76x76 public/apple-touch-icon-76x76.png

# Android Chrome Icons
convert -background none public/favicon.svg -resize 192x192 public/android-chrome-192x192.png
convert -background none public/favicon.svg -resize 512x512 public/android-chrome-512x512.png

# Microsoft Tiles
convert -background none public/favicon.svg -resize 144x144 public/mstile-144x144.png
convert -background none public/favicon.svg -resize 150x150 public/mstile-150x150.png
convert -background none public/favicon.svg -resize 310x310 public/mstile-310x310.png

# Generate multi-size ICO file
convert public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon.ico

echo "✓ Favicons generated successfully!"
echo "Generated files:"
echo "  - favicon.ico (16x16, 32x32, 48x48)"
echo "  - favicon-16x16.png"
echo "  - favicon-32x32.png"
echo "  - apple-touch-icon.png (180x180)"
echo "  - android-chrome-192x192.png"
echo "  - android-chrome-512x512.png"
echo "  - mstile icons"
