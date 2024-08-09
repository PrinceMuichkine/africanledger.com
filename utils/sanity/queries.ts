import { client } from './client'

export async function getArticles() {
    return await client.fetch(`
        *[_type == "article"] | order(publishedAt desc) {
            title,
            slug,
            author->{name},
            section->{name, slug},
            category->{name},
            publishedAt,
            excerpt,
            featuredImage{asset->{url}}
        }
    `)
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0]{
      title,
      slug,
      author->{name},
      publishedAt,
      featuredImage,
      body,
      category->{name},
      section->{name, slug}
    }
  `, { slug })
}