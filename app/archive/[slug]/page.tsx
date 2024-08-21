import Header from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import { getArticlesByCategory } from '@/lib/sanity/queries'
import Archive from '@/components/custom/Archive'
import styles from '@/lib/styles/archive.module.css'

const ARTICLES_PER_PAGE = 6

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }, searchParams: { page: string } }) {
    const currentPage = Number(searchParams.page) || 1
    const categorySlug = params.slug

    try {
        const articles = await getArticlesByCategory(categorySlug)
        const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
        const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
        const endIndex = startIndex + ARTICLES_PER_PAGE
        const currentArticles = articles.slice(startIndex, endIndex)

        return (
            <div className={styles.homeContainer}>
                <Header />
                <Archive
                    articles={currentArticles}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    categorySlug={categorySlug}
                />
                <Footer />
            </div>
        )
    } catch (error) {
        console.error("Error fetching articles:", error)
        return <div>Error loading articles. Please try again later.</div>
    }
}