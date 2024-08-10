import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import { getArticles } from '../../utils/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../utils/styles/archive.module.css'

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
            <div className={styles.homeContainer}>
                <Header />
                <main className={styles.mainContent}>
                    <h1 className={styles.archiveTitle}>Archive</h1>
                    <div className={styles.archiveContainer}>
                        {currentArticles.map((article: any) => (
                            <div key={article.slug.current} className={styles.articleCard}>
                                {article.featuredImage && (
                                    <Image
                                        src={article.featuredImage}
                                        alt={article.title}
                                        width={200}
                                        height={150}
                                        className={styles.articleImage}
                                    />
                                )}
                                <div className={styles.articleContent}>
                                    <div>
                                        <h2 className={styles.articleTitle}>
                                            <Link href={`/${article.section.slug.current}/${article.slug.current}`}>
                                                {article.title}
                                            </Link>
                                        </h2>
                                        <p className={styles.articleExcerpt}>{article.excerpt}</p>
                                    </div>
                                    <p className={styles.articleMeta}>
                                        By {article.author.name} | {new Date(article.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Link
                                key={i + 1}
                                href={`/archive?page=${i + 1}`}
                                className={`${styles.paginationLink} ${currentPage === i + 1 ? styles.active : ''}`}
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