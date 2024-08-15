import Header from '../components/landing/Header'
import { Footer } from "../components/landing/Footer"
import ImageScroller from '../components/ledger/ImageScroller'
import { getArticlesForImageScroller } from '../utils/sanity/queries'
import './home.css'

export default async function Home() {
  const articles = await getArticlesForImageScroller();

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <ImageScroller images={articles} />
      </main>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  )
}