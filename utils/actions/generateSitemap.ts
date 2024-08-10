import { promises as fs } from 'fs';
import path from 'path';
import { XMLBuilder } from 'fast-xml-parser';

const baseUrl = 'https://www.africanledger.com';

export async function generateSitemap() {
  const pagesDir = path.join(process.cwd(), 'app');
  const pages = await getPages(pagesDir);

  const xmlObj = {
    '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: pages.map(page => ({
        loc: `${baseUrl}${page.route}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority,
      })),
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  });

  return builder.build(xmlObj);
}

async function getPages(dir: string, basePath = ''): Promise<Array<{ route: string, changefreq: string, priority: string }>> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const pages: Array<{ route: string, changefreq: string, priority: string }> = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      pages.push(...await getPages(fullPath, relativePath));
    } else if (entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.ts')) {
      const route = basePath.replace(/\/page$/, '') || '/';
      pages.push({
        route,
        changefreq: route === '/' ? 'daily' : 'weekly',
        priority: route === '/' ? '1.0' : '0.8',
      });
    }
  }

  return pages;
}