import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'artistFirstName',
      title: 'Artist first name',
      type: 'string',
      initialValue: 'Camille',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artistLastName',
      title: 'Artist last name',
      type: 'string',
      initialValue: 'Klein',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'string',
      description: 'Optional line under the artist name, same styling as the artist name.',
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
      name: 'showName',
      title: 'Show name',
      type: 'string',
      description: 'Optional. Shown in italics below the dates (e.g. Works on paper).',
      initialValue: 'Works on paper',
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
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
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
          ],
          preview: {
            select: {title: 'title', subtitle: 'dates'},
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
