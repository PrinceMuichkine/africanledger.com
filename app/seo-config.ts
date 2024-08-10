import { DefaultSeoProps } from 'next-seo';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://africanledger.com';

const seoConfig: DefaultSeoProps = {
  defaultTitle: 'The African Ledger | Fact-based journalism',
  titleTemplate: '%s | The African Ledger',
  description: 'Get in-depth global news and analysis. Our coverage spans African politics, business, tech, culture and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: defaultUrl,
    siteName: 'The African Ledger',
    images: [
      {
        url: `${defaultUrl}/background.jpg`,
        width: 1200,
        height: 630,
        alt: 'The African Ledger',
      },
    ],
  },
  twitter: {
    handle: '@africanledger',
    site: '@africanledger',
    cardType: 'summary_large_image',
  },
};

export default seoConfig;