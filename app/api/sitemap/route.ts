import { NextResponse } from 'next/server';
import { generateSitemap } from '@/utils/actions/generateSitemap';
import { promises as fs } from 'fs';
import path from 'path'; 

export async function GET() {
  try {
    await generateSitemap();
    const sitemap = await fs.readFile(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}