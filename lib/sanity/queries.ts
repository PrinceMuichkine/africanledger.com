import { client } from './client'

export async function getArticles() {
    return client.fetch(`
        *[_type == "article"] | order(publishedAt desc) {
            title,
            slug,
            author->{name},
            section->{name, slug},
            category->{name},
            subcategory,
            publishedAt,
            excerpt,
            "featuredImage": featuredImage.asset->url,
            illustration,
            authorCity,
            mainTag
        }
    `, {}, { next: { revalidate: 60 } })
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0]{
      title,
      slug,
      author->{name},
      publishedAt,
      "featuredImage": featuredImage.asset->url,
      credits,
      caption,
      sources[]{name, url},
      body,
      category->{name},
      section->{name, slug},
      subcategory,
      excerpt,
      illustration,
      originalLanguage,
      authorCity,
      mainTag
    }
  `, { slug }, { next: { revalidate: 60 } }) 
}

export async function getArticlesForImageScroller() {
    return client.fetch(`
        *[_type == "article" && defined(featuredImage)] | order(publishedAt desc)[0...75] {
            _id,
            title,
            "slug": slug.current,
            "featuredImage": featuredImage.asset->url,
            publishedAt,
            excerpt,
            "section": section->{ name, slug },
            "category": category->{ name, slug },
            credits,
            "author": author->{ name },
            "recommendationTag": recommendationTag->name,
            "recommendedArticles": *[_type == "article" && recommendationTag->name == ^.recommendationTag->name && _id != ^._id] | order(publishedAt desc)[0...5] {
                _id,
                title,
                "slug": slug.current,
                "featuredImage": featuredImage.asset->url,
                publishedAt,
                excerpt,
                "section": section->{ name, slug },
                "category": category->{ name, slug },
                credits,
                "author": author->{ name }
            }
        }
    `, {}, { next: { revalidate: 60 } })
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url
    }
  `, {}, { next: { revalidate: 60 } })
}

export async function getArticlesByCategory(categorySlug: string) {
  return client.fetch(`
    *[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      title,
      slug,
      author->{name},
      section->{name, slug},
      category->{name, slug},
      subcategory,
      publishedAt,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      illustration,
      authorCity,
      mainTag
    }
  `, { categorySlug }, { next: { revalidate: 60 } })
}

export async function getRecommendedArticles(recommendationTag: string) {
  return client.fetch(`
    *[_type == "article" && recommendationTag->name == $recommendationTag] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      excerpt
    }
  `, { recommendationTag }, { next: { revalidate: 60 } })
}