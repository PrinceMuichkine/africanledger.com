import { client } from './client'

export async function getArticles() {
    return client.fetch(`
        *[_type == "article"] | order(publishedAt desc) {
            title,
            slug,
            author->{name},
            section->{name, slug},
            category->{name},
            publishedAt,
            excerpt,
            "featuredImage": featuredImage.asset->url
        }
    `, {}, { next: { revalidate: 60 } }) // Add revalidation here
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0]{
      title,
      slug,
      author->{name},
      publishedAt,
      "featuredImage": featuredImage.asset->url,
      body,
      category->{name},
      section->{name, slug}
    }
  `, { slug }, { next: { revalidate: 60 } }) // Add revalidation here
}