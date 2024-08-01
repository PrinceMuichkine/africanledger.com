import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import ImageScroller from '../../components/ledger/ImageScroller'
import '../home.css'

export default function Product() {
    const images = Array.from({ length: 50 }, (_, i) => ({
        id: (i + 1).toString(),
        src: `https://picsum.photos/600/600?random=${i + 1}`,
        alt: `Image ${i + 1}`
    }));

    return (
        <div className="home-container flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-start justify-center p-4">
                <div className="main-content w-full max-w-6xl mx-auto pl-16">
                    <h1 className="text-5xl font-bold mb-2 text-white">Welcome to the Product page.</h1>
                    <ImageScroller images={images} />
                </div>
            </main>
            <Footer />
        </div>
    )
}