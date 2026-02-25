import fs from 'fs';
import path from 'path';

const articlesDir = 'c:/Users/BDC5/BCPNPCAL/src/pages/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.astro'));

const articles = files.map(filename => {
    const filePath = path.join(articlesDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract title
    let title = '';
    const titleMatch = content.match(/const\s+title\s*=\s*(['"`])(.*?)\1;/i) || content.match(/title\s*=\s*(['"`])(.*?)\1/i);
    if (titleMatch) {
        title = titleMatch[2];
    }

    // Extract keywords
    let keywords = '';
    const keywordsMatch = content.match(/keywords\s*=\s*(['"`])(.*?)\1/i);
    if (keywordsMatch) {
        keywords = keywordsMatch[2];
    }

    // Extract description
    let description = '';
    const descMatch = content.match(/const\s+description\s*=\s*(['"`])(.*?)\1;/is) || content.match(/description\s*=\s*(['"`])(.*?)\1/i);
    if (descMatch) {
        description = descMatch[2].replace(/\n/g, ' ').trim();
    }

    return {
        filename,
        slug: filename.replace('.astro', ''),
        title,
        keywords,
        description
    };
});

fs.writeFileSync('c:/Users/BDC5/BCPNPCAL/articles_meta.json', JSON.stringify(articles, null, 2));
console.log(`Successfully extracted metadata for ${articles.length} articles.`);
