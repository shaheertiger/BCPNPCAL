# Favicon Setup Guide

This guide explains how to manage favicons for the BC PNP Calculator website, optimized for SEO and all platforms.

## 🚀 Quick Start - Automated Generation

The easiest way to generate all required favicons is using the automated script:

```bash
npm run generate:favicons
```

This will automatically generate all favicon sizes from `public/favicon.svg`.

## 🎨 Manual Favicon Addition

If you prefer to add custom favicons manually, follow these steps:

### Required Favicon Files

Place all favicon files in the `public/` directory with these exact names:

#### 1. Standard Favicons
- `favicon.svg` - Modern SVG favicon (any size, scalable)
- `favicon.ico` - Legacy ICO file (16x16, 32x32, 48x48 multi-size)
- `favicon-16x16.png` - Small favicon (16x16px)
- `favicon-32x32.png` - Standard favicon (32x32px)
- `favicon-48x48.png` - Large favicon (48x48px)

#### 2. Apple Touch Icons
- `apple-touch-icon.png` - Main Apple icon (180x180px)
- `apple-touch-icon-152x152.png` - iPad Retina (152x152px)
- `apple-touch-icon-120x120.png` - iPhone Retina (120x120px)
- `apple-touch-icon-76x76.png` - iPad (76x76px)

#### 3. Android Chrome Icons
- `android-chrome-192x192.png` - Android home screen (192x192px)
- `android-chrome-512x512.png` - Android splash screen (512x512px)

#### 4. Microsoft Tiles
- `mstile-70x70.png` - Small tile (70x70px)
- `mstile-144x144.png` - Medium tile (144x144px)
- `mstile-150x150.png` - Large tile (150x150px)
- `mstile-310x310.png` - Extra large tile (310x310px)

### Design Guidelines for Custom Favicons

When creating custom favicons:

1. **Colors**: Use the brand color `#dc2626` (red) as the primary color
2. **Background**: White (`#ffffff`) for the calculator icon
3. **Simplicity**: Keep the design simple and recognizable at small sizes
4. **Transparency**: Use transparent backgrounds for PNG files
5. **Format**:
   - SVG for modern browsers (scalable)
   - PNG for specific sizes (high quality, 100%)
   - ICO for legacy browsers (multi-size)

### Recommended Tools for Manual Creation

- **Online Tools**:
  - [Favicon.io](https://favicon.io/) - Generate from text, image, or emoji
  - [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive favicon generator
  - [Favicon Generator](https://www.favicon-generator.org/) - Simple multi-size generator

- **Design Software**:
  - Figma, Adobe Illustrator (for SVG)
  - Photoshop, GIMP (for PNG)
  - IcoFX, GIMP (for ICO)

### Manual Upload Steps

1. Create or obtain all required favicon files
2. Ensure they follow the naming convention above
3. Place all files in the `public/` directory
4. Rebuild the site: `npm run build`
5. Verify favicons appear correctly in different browsers

## 📋 Configuration Files

The following files are already configured in the project:

### BaseLayout.astro
Located at `src/layouts/BaseLayout.astro`, this file includes all favicon references:
- Standard favicon links
- Apple touch icon links
- Microsoft tile references

### manifest.json
Located at `public/manifest.json`, configured with:
- Android Chrome icon references
- PWA metadata

### browserconfig.xml
Located at `public/browserconfig.xml`, configured with:
- Microsoft tile specifications
- Tile color: `#dc2626`

## ✅ Verification Checklist

After adding favicons (manual or automated), verify:

- [ ] Favicon appears in browser tab
- [ ] Favicon shows in browser bookmarks
- [ ] Apple touch icon displays when saved to iOS home screen
- [ ] Android icon displays correctly
- [ ] No 404 errors in browser console for missing favicon files
- [ ] Favicon displays correctly in Google search results
- [ ] PWA icon shows in app drawer (mobile)
- [ ] Microsoft tile icon displays in Windows start menu

## 🔍 SEO Benefits

Properly configured favicons provide:

1. **Brand Recognition**: Consistent branding across all platforms
2. **Trust Signals**: Professional appearance in search results
3. **Mobile Experience**: Native app-like icons on home screens
4. **Platform Compatibility**: Optimal display on all devices
5. **Search Visibility**: Enhanced appearance in Google search results

## 🛠️ Troubleshooting

### Favicon Not Updating?

1. Clear browser cache: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear site data in browser settings
3. Check browser console for 404 errors
4. Verify file names match exactly (case-sensitive)
5. Rebuild the site: `npm run build`

### Wrong Favicon Showing?

1. Check if old favicons are cached
2. Verify the correct files are in `public/` directory
3. Check `dist/` folder after build to confirm files are copied
4. Use incognito/private browsing mode to test

### Mobile Icon Issues?

1. For iOS: Verify apple-touch-icon.png is 180x180px
2. For Android: Check manifest.json references correct files
3. Ensure PNG files are high quality (not compressed/blurry)
4. Test on actual devices, not just simulators

## 📦 What's Included

This project includes:

- ✅ Automated favicon generation script (`generate-favicons.mjs`)
- ✅ npm script command: `npm run generate:favicons`
- ✅ Base SVG favicon template (`public/favicon.svg`)
- ✅ All required configuration files
- ✅ SEO-optimized HTML references in BaseLayout.astro
- ✅ PWA manifest with icon references
- ✅ Microsoft browserconfig.xml

## 🔄 Regenerating Favicons

If you update the base `favicon.svg` file, regenerate all sizes:

```bash
npm run generate:favicons
```

This ensures all favicon sizes stay in sync with your design.

## 💡 Tips

1. **SVG First**: Always create your base design as an SVG for scalability
2. **Test All Sizes**: Preview your favicon at 16x16 to ensure it's recognizable
3. **Use Simple Designs**: Complex designs don't work well at small sizes
4. **Brand Consistency**: Use your brand colors consistently
5. **Regular Updates**: Update favicons when you rebrand or update your logo

---

**Need Help?** Check the [Web.dev Favicon Guide](https://web.dev/add-manifest/) or open an issue.
