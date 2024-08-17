'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import styles from '../../utils/styles/article.module.css'
import metaBarStyles from '../../utils/styles/articleMetaBar.module.css'
import { format } from 'date-fns'
import ArticleMetaBar from './ArticleMetaBar'

interface ArticlePageProps {
    article: {
        title: string
        featuredImage: string
        credits: string
        caption: string
        author: { name: string }
        publishedAt: string
        subcategory: string
        excerpt: string
        body: any
        imageReference: string
        authorCity: string
        mainTag: string
    }
}

interface FullScreenImageProps {
    src: string
    alt: string
    caption: string
    onClose: () => void
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({ src, alt, caption, onClose }) => (
    <div
        className={styles.fullScreenOverlay}
        onClick={onClose}
    >
        <div className={styles.fullScreenImageWrapper}>
            <Image
                src={src}
                alt={alt}
                layout="responsive"
                width={1600}
                height={900}
                objectFit="contain"
                className={styles.fullScreenImage}
            />
            {caption && <p className={styles.fullScreenCaption}>{caption}</p>}
        </div>
    </div>
)

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

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
    const formattedDate = format(new Date(article.publishedAt), 'MMMM d, yyyy')
    const [isFullScreen, setIsFullScreen] = useState(false)

    const handleImageClick = () => {
        setIsFullScreen(true)
    }

    const handleCloseFullScreen = () => {
        setIsFullScreen(false)
    }

    return (
        <div className={styles.articleContainer}>
            <div className={styles.articleHeader}>
                <div className={styles.meta}>
                    <span className={styles.subcategory}>{article.subcategory}</span>
                    <span className={styles.separator}> | </span>
                    <span className={styles.mainTag}>{article.mainTag}</span>
                </div>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer} onClick={handleImageClick}>
                        {article.featuredImage && (
                            <Image
                                src={article.featuredImage}
                                alt={article.title}
                                layout="fill"
                                objectFit="cover"
                                className={styles.featuredImage}
                            />
                        )}
                        <p className={styles.publishDate}>
                            {article.authorCity}
                        </p>
                    </div>
                    {article.credits && (
                        <p className={styles.credits}>{article.credits.toUpperCase()}</p>
                    )}
                    <p className={styles.imageReference}>{article.imageReference}</p>
                    <ArticleMetaBar publishDate={formattedDate} />
                </div>
            </div>
            <div className={metaBarStyles.separator}></div>
            <div className={styles.articleContent}>
                <div className={styles.content}>
                    <PortableText value={article.body} components={components} />
                </div>
            </div>
            {isFullScreen && (
                <FullScreenImage
                    src={article.featuredImage}
                    alt={article.title}
                    caption={article.caption}
                    onClose={handleCloseFullScreen}
                />
            )}
        </div>
    )
}

export default ArticlePage