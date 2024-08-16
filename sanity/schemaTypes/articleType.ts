import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the article',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'A unique URL identifier for the article',
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'reference',
      to: {type: 'section'},
      description: 'The main section this article belongs to; is it an opinion piece, a news article, an analysis, etc.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
      description: 'The specific category within the section; is it climate change, politics, business, etc.',
    }),
    defineField({
      name: 'mainTag',
      title: 'Main Tag',
      type: 'string',
      description: 'The primary tag associated with this article; it can be a word or an expression like "Teranga Coconut Frenzy" for an article about high demand for coconuts in Senegal',
    }),
defineField({
  name: 'recommendationTag', //
  title: 'Recommendation Tag',
  type: 'reference',
  to: {type: 'recommendationTag'}, 
  description: 'A tag used for recommending related articles, used for the scroller to display similar articles',
}),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Additional tags for categorizing the article; will be used for filtering and displaying related articles',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      description: 'The primary author of the article; can be a person or an entity',
    }),
    defineField({
      name: 'authorCity',
      title: 'Author City',
      type: 'string',
      description: 'The city where the author or enitty is based; it is written right after the article image on every article page',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief summary or teaser of the article',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'The main content of the article',
    }),
    defineField({
     name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'url',
            title: 'URL',
            type: 'url',
            description: 'Link to the source article or webpage',
          },
          {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Optional: Name | title of the source (e.g., "Al Jazeera | At least 15 killed, dozens missing after boat capsizes off Mauritania")',
          }
        ]
      }],
            description: 'Add one or more source URLs for this article',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The main image displayed with the article',
    }),
        defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
      description: 'Creditss for the featured image; "AFP/Getty Images"',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A caption for the featured image; it it is an illustration, it should be under this format: "Illustration per Peter Bullock — Getty Images." If it is a photo: "A private security guard stands outside of an ATM machine in downtown Cape Town, South Africa. Robert Kiyazaki, June 9, 2010."',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'The date and time when the article was published',
    }),
  ],
})