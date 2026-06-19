export const showBySlugQuery = `*[_type == "show" && slug.current == $slug][0]{
  title,
  showTitle,
  "slug": slug.current,
  images,
  "pressReleaseUrl": pressRelease.asset->url,
  pressLink,
  date
}`

export const homePageQuery = `*[_type == "homePage"][0]{
  artistFirstName,
  artistLastName,
  details,
  showName,
  dates,
  image,
  exhibitionLink,
  links[]{
    label,
    url
  },
  pastShows[]{
    title,
    dates,
    link,
    image
  }
}`
