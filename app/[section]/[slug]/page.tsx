import { getArticleBySlug } from '../../../utils/sanity/queries'
import ArticlePage from '../../../components/custom/ArticlePage'
import Header from '../../../components/landing/Header-connect'
import { Footer } from "../../../components/landing/Footer"
import styles from '../../../utils/styles/article.module.css'
import ArticleScroller from '../../../components/custom/ArticleScroller';


export default async function Article({ params }: { params: { slug: string } }) {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
        return <div>Article not found</div>
    }


    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.mainContent}>
                <ArticleScroller>
                    <ArticlePage article={article} />
                </ArticleScroller>
            </main>
            <Footer />
        </div>
    )
}