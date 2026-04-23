import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes/index.js'
import {structure} from './sanity/structure.js'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineConfig({
  name: 'luluberlu',
  title: 'Lulu Berlu',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema,
})
