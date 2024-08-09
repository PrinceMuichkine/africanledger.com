import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION,
  useCdn: false,
})