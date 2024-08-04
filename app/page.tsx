import Header from '../components/landing/Header'
import { Footer } from "../components/landing/Footer"
import ImageScroller from '../components/ledger/ImageScroller'
import './home.css'

export default function Home() {
  const images = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    src: `https://picsum.photos/600/600?random=${i + 1}`,
    alt: `Image ${i + 1}`
  }));

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <ImageScroller images={images} />
      </main>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  )
}