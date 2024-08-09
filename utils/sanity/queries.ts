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
    return await client.fetch(`
        *[_type == "article" && slug.current == $slug][0] {
            title,
            slug,
            author->{name, slug, bio, profileImage{asset->{url}}},
            section->{name, slug},
            category->{name, slug},
            publishedAt,
            featuredImage{asset->{url}},
            excerpt,
            body,
            tags[]->{name, slug}
        }
    `, { slug })
}