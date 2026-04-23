import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId, sanityConfigured } from '../env'

// https://www.sanity.io/docs/image-url
const builder = sanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null

export const urlFor = (source) => {
  if (!builder) {
    // Return a no-op chain so callers can safely compose URLs only when Sanity is configured.
    const chain = {
      width: () => chain,
      height: () => chain,
      auto: () => chain,
      format: () => chain,
      quality: () => chain,
      fit: () => chain,
      url: () => '',
      toString: () => '',
    }
    return chain
  }
  return builder.image(source)
}
