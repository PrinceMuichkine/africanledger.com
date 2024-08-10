import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import { getArticles } from '../../utils/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import '../../utils/styles/archive.css'

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
            <div className="home-container">
                <Header />
                <main>
                    <h1 className="text-5xl font-bold mb-8 text-center">Archive</h1>
                    <div className="archive-container">
                        {currentArticles.map((article: any) => (
                            <div key={article.slug.current} className="article-card">
                                {article.featuredImage && (
                                    <Image
                                        src={article.featuredImage}
                                        alt={article.title}
                                        width={200}
                                        height={150}
                                        className="article-image"
                                    />
                                )}
                                <div className="article-content">
                                    <div>
                                        <h2 className="article-title">
                                            <Link href={`/${article.section.slug.current}/${article.slug.current}`}>
                                                {article.title}
                                            </Link>
                                        </h2>
                                        <p className="article-excerpt">{article.excerpt}</p>
                                    </div>
                                    <p className="article-meta">
                                        By {article.author.name} | {new Date(article.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Link
                                key={i + 1}
                                href={`/archive?page=${i + 1}`}
                                className={`pagination-link ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </Link>
                        ))}
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