import Header from '../../../../components/landing/Header'
import { Footer } from "../../../../components/landing/Footer"
import { getArticles } from '../../../../utils/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import '../home.css'

const ARTICLES_PER_PAGE = 25

export default async function Archive({ searchParams }: { searchParams: { page: string } }) {
    const currentPage = Number(searchParams.page) || 1
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
                            <div key={article.slug.current} className="flex bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="w-1/3">
                                    {article.featuredImage && article.featuredImage.asset && (
                                        <Image
                                            src={article.featuredImage.asset.url}
                                            alt={article.title}
                                            width={300}
                                            height={200}
                                            objectFit="cover"
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="w-2/3 p-4">
                                    <Link href={`/${article.section?.slug?.current || 'uncategorized'}/${article.slug.current}`}>
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-600">{article.title}</h2>
                                    </Link>
                                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{article.author?.name}</span>
                                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                    <span className="mt-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                        {article.category?.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center space-x-4 mt-8">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Link key={page} href={`/archive?page=${page}`}>
                                <span className={`px-3 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                    {page}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}