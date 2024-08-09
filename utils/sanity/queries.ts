import { client } from './client'

export async function getArticles() {
  return await client.fetch(`*[_type == "article"] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    publishedAt,
    author->{name},
    category->{name}
  }`)
}

// Add more query functions as needed