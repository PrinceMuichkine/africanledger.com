import Link from 'next/link'
import Image from 'next/image'
import styles from '../../lib/styles/archive.module.css'

interface Category {
    slug: string;
    title: string;
    description?: string;
    image?: string;
}

interface CategoryArchiveProps {
    categories: Category[];
    currentPage: number;
    totalPages: number;
}

export default function CategoryArchive({ categories, currentPage, totalPages }: CategoryArchiveProps) {
    return (
        <main className={styles.mainContent}>
            <h1 className={styles.archiveTitle}>Categories</h1>
            <div className={styles.archiveContainer}>
                {categories.map((category) => (
                    <Link href={`/archive/${category.slug}`} key={category.slug} className={styles.articleCard}>
                        {category.image && (
                            <Image
                                src={category.image}
                                alt={category.title}
                                width={200}
                                height={150}
                                className={styles.articleImage}
                            />
                        )}
                        <div className={styles.articleContent}>
                            <h2 className={styles.articleTitle}>{category.title}</h2>
                            {category.description && <p className={styles.articleExcerpt}>{category.description}</p>}
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <Link href={`/archive?page=${currentPage - 1}`} className={styles.paginationLink}>
                        Previous
                    </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={`/archive?page=${page}`}
                        className={`${styles.paginationLink} ${page === currentPage ? styles.active : ''}`}
                    >
                        {page}
                    </Link>
                ))}
                {currentPage < totalPages && (
                    <Link href={`/archive?page=${currentPage + 1}`} className={styles.paginationLink}>
                        Next
                    </Link>
                )}
            </div>
        </main>
    )
}