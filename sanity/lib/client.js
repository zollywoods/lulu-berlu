import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, sanityConfigured } from '../env'

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  : null
