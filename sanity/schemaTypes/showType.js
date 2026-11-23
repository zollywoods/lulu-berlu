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
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 4,
              description:
                'Shown under this image. The artwork title, before the comma and year, is italicized on the site.',
            }),
            defineField({
              name: 'imagePath',
              title: 'Public image path',
              type: 'string',
              description:
                'Optional path in /public when this image is not uploaded (e.g. /molly/MZH_1_L Bracket.jpg).',
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
      name: 'pressReleasePath',
      title: 'Press release path',
      type: 'string',
      description: 'Optional path in /public if the PDF is not uploaded (e.g. /molly.pdf).',
    }),
    defineField({
      name: 'pressLinks',
      title: 'Press links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'showPressLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Path or full URL (e.g. /mar.pdf or https://...).',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        }),
      ],
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
