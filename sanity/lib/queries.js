export const showBySlugQuery = `*[_type == "show" && slug.current == $slug][0]{
  "artist": coalesce(artist, title),
  showTitle,
  "slug": slug.current,
  images,
  "pressReleaseUrl": pressRelease.asset->url,
  pressLink,
  date
}`

export const homePageQuery = `*[_type == "homePage"][0]{
  artist,
  showTitle,
  details,
  dates,
  image,
  imagePath,
  exhibitionLink,
  links[]{
    label,
    url
  },
  pastShows[]{
    artist,
    showTitle,
    dates,
    link,
    image,
    imagePath
  }
}`
