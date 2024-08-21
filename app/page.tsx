import Header from '../components/landing/Header'
import { Footer } from "../components/landing/Footer"
import ImageScroller from '../components/custom/ImageScroller'
import { getArticlesForImageScroller, getRecommendedArticles } from '../lib/sanity/queries'
import './home.css'

interface Article {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  excerpt?: string;
  recommendationTag?: string;
}

interface ArticleWithRecommendations extends Article {
  recommendedArticles?: Article[];
}

export default async function Home() {
  const articles: Article[] = await getArticlesForImageScroller();

  // Fetch recommended articles for each image
  const articlesWithRecommendations: ArticleWithRecommendations[] = await Promise.all(articles.map(async (article: Article) => {
    if (article.recommendationTag) {
      const recommendedArticles = await getRecommendedArticles(article.recommendationTag);
      return { ...article, recommendedArticles };
    }
    return article;
  }));

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <ImageScroller images={articlesWithRecommendations} />
      </main>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  )
}