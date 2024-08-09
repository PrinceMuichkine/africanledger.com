import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import { getArticles } from '../../utils/sanity/queries'
import '../home.css'


export default async function Archive() {
    const articles = await getArticles()

    return (
        <div className="home-container flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-start justify-center p-4">
                <div className="main-content w-full max-w-6xl mx-auto pl-16">
                    <h1 className="text-5xl font-bold mb-8 text-white">Archive</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article: any) => (
                            <div key={article.slug.current} className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{article.author?.name}</span>
                                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <span className="mt-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    {article.category?.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}