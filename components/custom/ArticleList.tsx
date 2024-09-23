import Link from 'next/link'
import React from 'react'

interface Article {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt: string
    authorName: string
    tags: string[]
}

export default function ArticleList({ articles }: { articles: Article[] }) {
    return (
        <div className="space-y-8">
            {articles.map((article) => (
                <article key={article._id} className="border-b border-gray-700 pb-8">
                    <Link href={`/articles/${article.slug.current}`}>
                        <h2 className="text-2xl font-semibold mb-2 hover:underline">{article.title}</h2>
                    </Link>
                    <p className="text-gray-400 mb-2">
                        By {article.authorName} | {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 mb-4">{article.excerpt}</p>
                    <div className="flex space-x-2">
                        {article.tags.map((tag) => (
                            <span key={tag} className="bg-gray-800 text-sm px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    )
}