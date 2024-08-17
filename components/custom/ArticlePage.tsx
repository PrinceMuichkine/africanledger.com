import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import styles from '../../utils/styles/article.module.css'
import { format } from 'date-fns'

interface ArticlePageProps {
    article: {
        title: string
        featuredImage: string
        author: { name: string }
        publishedAt: string
        category: { name: string }
        excerpt: string
        body: any
        imageReference: string
        authorCity: string
        mainTag: string
    }
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <div className={styles.imageContainer}>
                <Image
                    src={value.asset.url}
                    alt={value.alt || ' '}
                    layout="responsive"
                    width={800}
                    height={450}
                />
                {value.caption && <p className={styles.caption}>{value.caption}</p>}
            </div>
        ),
    },
    block: {
        normal: ({ children, index }) => {
            if (index === 0) {
                return <p className={styles.dropCap}>{children}</p>
            }
            return <p>{children}</p>
        },
    },
}

export default function ArticlePage({ article }: ArticlePageProps) {
    const formattedDate = format(new Date(article.publishedAt), 'MMMM d, yyyy')

    return (
        <div className={styles.articleContainer}>
            <div className={styles.articleHeader}>
                <div className={styles.meta}>
                    <span className={styles.category}>{article.category.name}</span>
                    <span className={styles.mainTag}>{article.mainTag}</span>
                </div>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.imageContainer}>
                    {article.featuredImage && (
                        <Image
                            src={article.featuredImage}
                            alt={article.title}
                            layout="fill"
                            objectFit="cover"
                            className={styles.featuredImage}
                        />
                    )}
                    <p className={styles.imageReference}>Illustration: {article.imageReference}</p>
                    <p className={styles.publishDate}>
                        {formattedDate} - {article.authorCity}
                    </p>
                </div>
            </div>
            <div className={styles.articleContent}>
                <div className={styles.content}>
                    <PortableText value={article.body} components={components} />
                </div>
            </div>
        </div>
    )
}