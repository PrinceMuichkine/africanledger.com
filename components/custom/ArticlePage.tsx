'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsCircleFill } from 'react-icons/bs'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import styles from '@/lib/styles/article.module.css'
import metaBarStyles from '@/lib/styles/articleMetaBar.module.css'
import sourceStyles from '@/lib/styles/sourcebox.module.css'
import { format } from 'date-fns'
import ArticleMetaBar from './ArticleMetaBar'
import { SourceBox, ViewMoreBox, SourcePanel } from './Sourcebox'
import axios from 'axios'

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
        sources: { name: string; url: string }[]
        originalLanguage: string
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
                return <p className={`${styles.paragraph} ${styles.dropCap}`}>{children}</p>
            }
            return <p className={styles.paragraph}>{children}</p>
        },
        h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
    },
    list: {
        bullet: ({ children }) => <ul className={styles.bulletList}>{children}</ul>,
        number: ({ children }) => <ol className={styles.numberedList}>{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className={styles.listItem}>{children}</li>,
        number: ({ children }) => <li className={styles.listItem}>{children}</li>,
    },
}

const LanguageSwitcher: React.FC<{ onLanguageChange: (lang: string) => void, currentLanguage: string }> = ({ onLanguageChange, currentLanguage }) => {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'zu', name: 'isiZulu' },
        { code: 'yo', name: 'Yoruba' },
        { code: 'sw', name: 'Swahili' },
        { code: 'ha', name: 'Hausa' },
    ]

    return (
        <select
            onChange={(e) => onLanguageChange(e.target.value)}
            value={currentLanguage}
            className={styles.languageSwitcher}
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    )
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
    const formattedDate = format(new Date(article.publishedAt), 'MMMM d, yyyy')
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [showAllSources, setShowAllSources] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(article.originalLanguage)
    const [translatedContent, setTranslatedContent] = useState<Record<string, any>>({})

    const handleImageClick = () => {
        setIsFullScreen(true)
    }

    const handleCloseFullScreen = () => {
        setIsFullScreen(false)
    }

    const displayedSources = article.sources?.slice(0, 3) || []
    const remainingSources = article.sources?.slice(3) || []

    const handleViewMore = () => {
        setShowAllSources(true)
    }

    const translateContent = async (text: string, targetLanguage: string) => {
        try {
            const response = await axios.post('/api/translate', { text, targetLanguage })
            return response.data.translatedText
        } catch (error) {
            console.error('Translation failed:', error)
            return text
        }
    }

    useEffect(() => {
        const translateArticle = async () => {
            if (currentLanguage !== article.originalLanguage) {
                const translatedTitle = await translateContent(article.title, currentLanguage)
                const translatedExcerpt = await translateContent(article.excerpt, currentLanguage)
                const translatedBody = await translateContent(JSON.stringify(article.body), currentLanguage)

                setTranslatedContent({
                    title: translatedTitle,
                    excerpt: translatedExcerpt,
                    body: JSON.parse(translatedBody),
                })
            }
        }

        translateArticle()
    }, [currentLanguage, article])

    const title = currentLanguage === article.originalLanguage ? article.title : translatedContent.title || article.title
    const excerpt = currentLanguage === article.originalLanguage ? article.excerpt : translatedContent.excerpt || article.excerpt
    const body = currentLanguage === article.originalLanguage ? article.body : translatedContent.body || article.body

    return (
        <div className={styles.articleContainer}>
            <div className={styles.articleHeader}>
                <LanguageSwitcher onLanguageChange={setCurrentLanguage} currentLanguage={currentLanguage} />
                <div className={styles.meta}>
                    <span className={styles.subcategory}>{article.subcategory}</span>
                    <span className={styles.separator}> | </span>
                    <span className={styles.mainTag}>{article.mainTag}</span>
                </div>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.excerpt}>{excerpt}</p>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer} onClick={handleImageClick}>
                        {article.featuredImage && (
                            <Image
                                src={article.featuredImage}
                                alt={title}
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

                    {article.sources && article.sources.length > 0 && (
                        <>
                            <div className={sourceStyles.sourcesHeader}>
                                <BsCircleFill className={sourceStyles.sourcesIcon} />
                                <span className={sourceStyles.sourcesTitle}>Sources</span>
                            </div>
                            <div className={sourceStyles.sourcesContainer}>
                                {displayedSources.map((source, index) => (
                                    <SourceBox key={index} name={source.name} url={source.url} order={index + 1} />
                                ))}
                                {remainingSources.length > 0 && (
                                    <ViewMoreBox
                                        count={remainingSources.length}
                                        onClick={handleViewMore}
                                        remainingSources={remainingSources}
                                    />
                                )}
                            </div>
                        </>
                    )}

                    <ArticleMetaBar publishDate={formattedDate} />
                </div>
            </div>
            <div className={metaBarStyles.separator}></div>
            <div className={styles.articleContent}>
                <div className={styles.content}>
                    <PortableText
                        value={body}
                        components={components}
                    />
                    <span className={styles.endSquare}>■</span>
                </div>
            </div>
            {isFullScreen && (
                <FullScreenImage
                    src={article.featuredImage}
                    alt={title}
                    caption={article.caption}
                    onClose={handleCloseFullScreen}
                />
            )}
            <SourcePanel
                isOpen={showAllSources}
                onClose={() => setShowAllSources(false)}
                sources={article.sources}
            />
        </div>
    )
}