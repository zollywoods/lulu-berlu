import {ImagesIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const showType = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      description: 'Shown on the first line (e.g. Camille Klein).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showTitle',
      title: 'Show title',
      type: 'string',
      description: 'Shown under the artist (e.g. Works on Paper).',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'artist', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'pressRelease',
      title: 'Press release (PDF)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'pressLink',
      title: 'Artforum link',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Example: March 14 – May 10, 2026',
    }),
  ],
  preview: {
    select: {title: 'artist', subtitle: 'showTitle', media: 'images.0'},
  },
})
