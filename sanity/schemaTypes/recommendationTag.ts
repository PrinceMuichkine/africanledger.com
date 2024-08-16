import { defineField, defineType } from 'sanity'

export const recommendationTagType = defineType({
  name: 'recommendationTag',
  title: 'Recommendation Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the recommendation tag',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'A unique URL-friendly identifier for the recommendation tag',
    }),
    defineField({
      name: 'logic',
      title: 'Logic',
      type: 'text',
      description: 'A brief explanation of the logic behind the creation of this recommendation tag (optional)',
    }),
  ],
})