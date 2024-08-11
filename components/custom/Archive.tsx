import Link from 'next/link'
import Image from 'next/image'
import styles from '../../utils/styles/archive.module.css'

interface Article {
    slug: { current: string };
    title: string;
    featuredImage: string;
    category?: { name: string };
    publishedAt: string;
    excerpt: string;
}

interface ArchiveProps {
    articles: Article[];
    currentPage: number;
    totalPages: number;
}

export default function Archive({ articles, currentPage, totalPages }: ArchiveProps) {
    return (
        <main className={styles.mainContent}>
            <h1 className={styles.archiveTitle}>Archive</h1>
            <div className={styles.archiveContainer}>
                {articles.map((article) => {
                    const categoryName = article.category?.name || 'Uncategorized';

                    return (
                        <Link
                            key={article.slug.current}
                            href={`/${article.slug.current}`} // Removed category from URL
                            className={styles.articleCard}
                        >
                            {article.featuredImage && (
                                <Image
                                    src={article.featuredImage}
                                    alt={article.title}
                                    width={150}
                                    height={100}
                                    className={styles.articleImage}
                                />
                            )}
                            <div className={styles.articleContent}>
                                <h2 className={styles.articleTitle}>
                                    {article.title}
                                </h2>
                                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                                <div className={styles.articleMeta}>
                                    {categoryName} | Published: {new Date(article.publishedAt).toLocaleDateString()}
                                </div>
                            </div>
                        </Link>
                    );
                })}
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
    )
}