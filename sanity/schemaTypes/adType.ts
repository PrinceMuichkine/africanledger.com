import { defineField, defineType } from 'sanity'

export const adType = defineType({
  name: 'ad',
  title: 'Advertisement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A title for the advertisement',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The image for the advertisement',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'The URL to direct users to when they click on the ad',
    }),
    defineField({
      name: 'frequency',
      title: 'Frequency',
      type: 'number',
      description: 'How often this ad should appear (e.g., every 25 images)',
    }),
  ],
})