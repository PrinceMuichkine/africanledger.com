import { NextResponse } from 'next/server';
import { generateSitemap } from '@/utils/actions/generateSitemap';

export async function GET() {
  try {
    const sitemap = await generateSitemap();
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