import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'african-ledger',
  title: 'The African Ledger',

  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_VERSION!,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})