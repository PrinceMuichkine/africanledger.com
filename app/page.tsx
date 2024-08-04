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
    <div className="home-container flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="main-content w-full max-w-6xl mx-auto">
          <ImageScroller images={images} />
        </div>
      </main>
      <Footer />
    </div>
  )
}