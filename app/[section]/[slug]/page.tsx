import Header from '../../../components/landing/Header'
import { Footer } from "../../../components/landing/Footer"
import { getArticleBySlug } from '../../../utils/sanity/queries'
import Image from 'next/image'
import '../../home.css'

export default async function Article({ params }: { params: { slug: string } }) {
    const { slug } = params
    const article = await getArticleBySlug(slug)

    if (!article) {
        return <div>Article not found</div>
    }

    return (
        <div className="home-container flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 w-full flex flex-col items-start justify-center p-4">
                <div className="main-content w-full max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{article.title}</h1>
                    {article.featuredImage && article.featuredImage.asset && (
                        <Image
                            src={article.featuredImage.asset.url}
                            alt={article.title}
                            width={800}
                            height={400}
                            objectFit="cover"
                            className="mb-6 rounded-lg"
                        />
                    )}
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>{article.author?.name}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="prose max-w-none">
                        {/* Render article.body here using a Portable Text component */}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}