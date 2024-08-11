import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import { getArticles } from '../../utils/sanity/queries'
import Archive from '../../components/custom/Archive'
import styles from '../../utils/styles/archive.module.css'

const ARTICLES_PER_PAGE = 24

// Update the Article interface
interface Article {
    slug: { current: string };
    title: string;
    featuredImage: string;
    category: { slug: { current: string }; title: string };
    publishedAt: string;
    excerpt: string;
}

export default async function ArchivePage({ searchParams }: { searchParams: { page: string } }) {
    const currentPage = Number(searchParams.page) || 1

    try {
        const articles = await getArticles()

        // Ensure the category information is correctly mapped
        const processedArticles = articles.map((article: Article) => ({
            ...article,
            category: article.category || { slug: { current: 'uncategorized' }, title: 'Uncategorized' }
        }))

        const totalPages = Math.ceil(processedArticles.length / ARTICLES_PER_PAGE)
        const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
        const endIndex = startIndex + ARTICLES_PER_PAGE
        const currentArticles = processedArticles.slice(startIndex, endIndex)

        return (
            <div className={styles.homeContainer}>
                <Header />
                <Archive
                    articles={currentArticles}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
                <Footer />
            </div>
        )
    } catch (error) {
        console.error("Error fetching articles:", error)
        return <div>Error loading articles. Please try again later.</div>
    }
}