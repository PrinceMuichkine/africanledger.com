import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import { getCategories } from '../../utils/sanity/queries'
import CategoryArchive from '../../components/custom/CategoryArchive'
import styles from '../../utils/styles/archive.module.css'

const CATEGORIES_PER_PAGE = 4

interface Category {
    slug: string;
    title: string;
    description?: string;
    image?: string;
}

export default async function ArchivePage({ searchParams }: { searchParams: { page: string } }) {
    const currentPage = Number(searchParams.page) || 1

    try {
        const categories = await getCategories()

        const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE)
        const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE
        const endIndex = startIndex + CATEGORIES_PER_PAGE
        const currentCategories = categories.slice(startIndex, endIndex)

        return (
            <div className={styles.homeContainer}>
                <Header />
                <CategoryArchive
                    categories={currentCategories}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
                <Footer />
            </div>
        )
    } catch (error) {
        console.error("Error fetching categories:", error)
        return <div>Error loading categories. Please try again later.</div>
    }
}