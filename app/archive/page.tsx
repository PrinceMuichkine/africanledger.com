import Header from '../../components/landing/Header'
import { Footer } from "../../components/landing/Footer"
import '../home.css'
import { client } from '../../sanity/lib/client'
import ArticleList from '../../components/custom/ArticleList'

async function getArticles() {
    const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "authorName": authors[0]->name,
    "tags": tags[]->name
  }`
    return await client.fetch(query)
}

export default async function Archive() {
    const articles = await getArticles()

    return (
        <div className="home-container flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-start justify-center p-4">
                <div className="main-content w-full max-w-6xl mx-auto pl-16">
                    <h1 className="text-5xl font-bold mb-8 text-white">Archive</h1>
                    <ArticleList articles={articles} />
                </div>
            </main>
            <Footer />
        </div>
    )
}