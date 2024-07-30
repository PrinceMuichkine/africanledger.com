import Header from '../components/landing/Header'
import { Footer } from '../components/landing/Footer'
import './home.css'

export default function Home() {
  return (
    <div className="home-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full flex flex-col items-start justify-center p-4">
        <div className="main-content w-full max-w-6xl mx-auto pl-16">
          <h1 className="text-5xl font-bold mb-2 text-white">Welcome to the Home page.</h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}