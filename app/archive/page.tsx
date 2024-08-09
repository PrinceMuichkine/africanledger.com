import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import { getArticles } from '../../utils/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import '../home.css'

const ARTICLES_PER_PAGE = 25

export default async function Archive({ searchParams }: { searchParams: { page: string } }) {
    const currentPage = Number(searchParams.page) || 1

    try {
        const articles = await getArticles()

        const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
        const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
        const endIndex = startIndex + ARTICLES_PER_PAGE
        const currentArticles = articles.slice(startIndex, endIndex)

        return (
            <div className="home-container flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-1 w-full flex flex-col items-start justify-center p-4">
                    <div className="main-content w-full max-w-6xl mx-auto">
                        <h1 className="text-5xl font-bold mb-8 text-gray-800">Archive</h1>
                        <div className="space-y-8">
                            {currentArticles.map((article: any) => (
                                <div key={article.slug.current} className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold mb-2">
                                        <Link href={`/${article.section.slug.current}/${article.slug.current}`}>
                                            {article.title}
                                        </Link>
                                    </h2>
                                    {article.featuredImage && (
                                        <Image
                                            src={article.featuredImage}
                                            alt={article.title}
                                            width={300}
                                            height={200}
                                            className="mb-4 rounded"
                                        />
                                    )}
                                    <p className="text-gray-600 mb-2">{article.excerpt}</p>
                                    <p className="text-sm text-gray-500">
                                        By {article.author.name} | {new Date(article.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="flex justify-center space-x-4 mt-8">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Link
                                    key={i + 1}
                                    href={`/archive?page=${i + 1}`}
                                    className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {i + 1}
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    } catch (error) {
        console.error("Error fetching articles:", error)
        return <div>Error loading articles. Please try again later.</div>
    }
}