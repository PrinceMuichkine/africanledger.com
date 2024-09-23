'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsCircleFill } from 'react-icons/bs'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { TypedObject } from '@portabletext/types'
import { SanityDocument } from '@sanity/client'
import styles from '@/lib/styles/article.module.css'
import metaBarStyles from '@/lib/styles/articleMetaBar.module.css'
import sourceStyles from '@/lib/styles/sourcebox.module.css'
import { format } from 'date-fns'
import ArticleMetaBar from './ArticleMetaBar'
import { SourceBox, ViewMoreBox, SourcePanel } from './Sourcebox'
import LanguageSwitcher from './LanguageSwitcher'
import axios from 'axios'

interface Article extends SanityDocument {
    title: string;
    featuredImage: string;
    credits: string;
    caption: string;
    author: { name: string };
    publishedAt: string;
    subcategory: string;
    excerpt: string;
    body: TypedObject | TypedObject[];
    imageReference: string;
    authorCity: string;
    mainTag: string;
    sources: { name: string; url: string }[];
    originalLanguage: string;
}

interface ArticlePageProps {
    article: Article;
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
                width={1600}
                height={900}
                style={{ objectFit: 'contain' }}
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
                    width={800}
                    height={450}
                    style={{ objectFit: 'cover' }}
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

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
    const [currentLanguage, setCurrentLanguage] = useState(article.originalLanguage)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [showAllSources, setShowAllSources] = useState(false)
    const [translatedContent, setTranslatedContent] = useState<Article>(article)

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

    const formattedDate = format(new Date(article.publishedAt), 'MMMM d, yyyy')

    const translateText = async (text: string, targetLanguage: string): Promise<string> => {
        try {
            const response = await axios.post('/api/translate', { text, targetLanguage });
            return response.data.translatedText || text;
        } catch (error) {
            console.error('Translation failed:', error);
            return text;
        }
    };

    const translateContent = async (content: any, targetLanguage: string): Promise<any> => {
        if (typeof content === 'string') {
            return await translateText(content, targetLanguage);
        } else if (Array.isArray(content)) {
            return await Promise.all(content.map(item => translateContent(item, targetLanguage)));
        } else if (typeof content === 'object' && content !== null) {
            const translatedObj: Record<string, any> = {};
            for (const [key, value] of Object.entries(content)) {
                translatedObj[key] = await translateContent(value, targetLanguage);
            }
            return translatedObj;
        }
        return content;
    };

    useEffect(() => {
        const translateArticle = async () => {
            if (currentLanguage !== article.originalLanguage) {
                const fieldsToTranslate = ['title', 'excerpt', 'body', 'subcategory', 'mainTag', 'caption'] as const;
                const translatedArticle: Partial<Article> = { ...article };

                for (const field of fieldsToTranslate) {
                    if (field in article) {
                        translatedArticle[field] = await translateContent(article[field], currentLanguage);
                    }
                }

                setTranslatedContent(translatedArticle as Article);
            } else {
                setTranslatedContent(article);
            }
        };

        translateArticle();
    }, [currentLanguage, article]);

    return (
        <div className={styles.articleContainer}>
            <div className={styles.articleHeader}>
                <LanguageSwitcher onLanguageChange={setCurrentLanguage} currentLanguage={currentLanguage} />
                <div className={styles.meta}>
                    <span className={styles.subcategory}>{translatedContent.subcategory}</span>
                    <span className={styles.separator}> | </span>
                    <span className={styles.mainTag}>{translatedContent.mainTag}</span>
                </div>
                <h1 className={styles.title}>{translatedContent.title}</h1>
                <p className={styles.excerpt}>{translatedContent.excerpt}</p>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer} onClick={handleImageClick}>
                        {translatedContent.featuredImage && (
                            <Image
                                src={translatedContent.featuredImage}
                                alt={translatedContent.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className={styles.featuredImage}
                            />
                        )}
                        <p className={styles.publishDate}>
                            {translatedContent.authorCity}
                        </p>
                    </div>
                    {translatedContent.credits && (
                        <p className={styles.credits}>{translatedContent.credits.toUpperCase()}</p>
                    )}
                    <p className={styles.imageReference}>{translatedContent.imageReference}</p>

                    {translatedContent.sources && translatedContent.sources.length > 0 && (
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
                        value={translatedContent.body}
                        components={components}
                    />
                    <span className={styles.endSquare}>■</span>
                </div>
            </div>
            {isFullScreen && (
                <FullScreenImage
                    src={translatedContent.featuredImage}
                    alt={translatedContent.title}
                    caption={translatedContent.caption}
                    onClose={handleCloseFullScreen}
                />
            )}
            <SourcePanel
                isOpen={showAllSources}
                onClose={() => setShowAllSources(false)}
                sources={translatedContent.sources}
            />
        </div>
    )
}

export default ArticlePage