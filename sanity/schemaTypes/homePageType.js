import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      description: 'Shown bold on the first line (e.g. Camille Klein).',
      initialValue: 'Camille Klein',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showTitle',
      title: 'Show title',
      type: 'string',
      description: 'Shown on the line under the artist (e.g. Works on Paper).',
      initialValue: 'Works on Paper',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'string',
      description: 'Optional line under the show title, same styling as the artist.',
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'string',
      description: 'Example: March 14 - May 10, 2026',
      initialValue: 'March 14 - May 10, 2026',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
    defineField({
      name: 'imagePath',
      title: 'Public image path',
      type: 'string',
      description:
        'Optional. Path in /public instead of an uploaded image (e.g. /mollys.jpeg).',
    }),
    defineField({
      name: 'exhibitionLink',
      title: 'Exhibition link',
      type: 'string',
      description: 'Where the home block links (e.g. /shows/camille).',
      initialValue: '/shows/camille',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'homeLink',
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
      name: 'pastShows',
      title: 'Past shows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pastShow',
          fields: [
            defineField({
              name: 'artist',
              title: 'Artist',
              type: 'string',
              description: 'Shown bold on the first line.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'showTitle',
              title: 'Show title',
              type: 'string',
              description: 'Optional line under the artist (e.g. Works on Paper).',
            }),
            defineField({
              name: 'dates',
              title: 'Dates',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Path or URL (e.g. /shows/camille).',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
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
            defineField({
              name: 'imagePath',
              title: 'Public image path',
              type: 'string',
              description:
                'Optional. Path in /public instead of an uploaded image (e.g. /hannahsplay.jpeg).',
            }),
          ],
          preview: {
            select: {title: 'artist', subtitle: 'showTitle'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
