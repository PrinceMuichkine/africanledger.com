import {defineField, defineType} from 'sanity'

export const mediaType = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),
  ],
})