import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/sanity/queries';
import RSS from 'rss';

interface Article {
  title: string;
  excerpt: string;
  section: {
    slug: {
      current: string;
    };
  };
  slug: {
    current: string;
  };
  publishedAt: string;
  author: {
    name: string;
  };
}

export async function GET() {
  const articles = await getArticles();
  const site_url = 'https://www.africanledger.com';

  const feed = new RSS({
    title: 'The African Ledger',
    description: 'Get in-depth global news and analysis. Our coverage spans African politics, business, tech, culture and more.',
    site_url,
    feed_url: `${site_url}/rss.xml`,
    language: 'en',
  });

  articles.forEach((article: Article) => {
    feed.item({
      title: article.title,
      description: article.excerpt,
      url: `${site_url}/${article.section.slug.current}/${article.slug.current}`,
      date: new Date(article.publishedAt),
      author: article.author.name,
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}