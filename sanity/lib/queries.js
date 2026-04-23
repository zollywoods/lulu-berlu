export const showBySlugQuery = `*[_type == "show" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  images,
  "pressReleaseUrl": pressRelease.asset->url,
  date
}`
