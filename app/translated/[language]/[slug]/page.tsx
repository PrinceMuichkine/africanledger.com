import { getArticleBySlug } from '@/lib/sanity/queries'
import { translateContent } from '@/lib/lelapa/translation'
import ArticlePage from '@/components/custom/ArticlePage'

export default async function TranslatedArticle({ params }: { params: { language: string; slug: string } }) {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
        return <div>Article not found</div>
    }

    try {
        const translatedArticle = await translateArticle(article, params.language)
        return <ArticlePage article={translatedArticle} />
    } catch (error) {
        console.error('Translation failed:', error)
        return <div>Translation failed. Please try again later.</div>
    }
}

async function translateArticle(article: any, targetLanguage: string): Promise<any> {
    const fieldsToTranslate = ['title', 'excerpt', 'body', 'subcategory', 'mainTag', 'caption'] as const
    const translatedArticle: Record<string, any> = { ...article }

    for (const field of fieldsToTranslate) {
        if (field in article) {
            translatedArticle[field] = await translateContent(article[field], targetLanguage)
        }
    }

    return translatedArticle
}