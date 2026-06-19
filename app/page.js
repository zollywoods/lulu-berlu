import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";
import { sanityConfigured } from "@/sanity/env";
import HomePageShell from "./HomePageShell";

export const revalidate = 60;

const defaults = {
  artistFirstName: "Camille",
  artistLastName: "Klein",
  details: null,
  showName: "Works on paper",
  dates: "March 14 - May 10, 2026",
  imageUrl: "/camille.jpeg",
  imageAlt: "Camille Klein",
  exhibitionLink: "/shows/camille",
  links: [],
  pastShows: [
    {
      title: "Camille Klein",
      dates: "March 14 - May 10, 2026",
      link: "/shows/camille",
      imageUrl: "/camille.jpeg",
      imageAlt: "Camille Klein",
    },
  ],
};

export default async function Home() {
  let home = null;

  if (sanityConfigured && client) {
    home = await client.fetch(homePageQuery);
  }

  const artistFirstName = home?.artistFirstName ?? defaults.artistFirstName;
  const artistLastName = home?.artistLastName ?? defaults.artistLastName;
  const details = home?.details ?? defaults.details;
  const showName = home?.showName ?? (home ? null : defaults.showName);
  const dates = home?.dates ?? defaults.dates;
  const exhibitionLink = home?.exhibitionLink ?? defaults.exhibitionLink;
  const links = home?.links ?? defaults.links;
  const pastShows = (home?.pastShows ?? defaults.pastShows).map((show) => ({
    title: show.title,
    dates: show.dates,
    link: show.link,
    imageUrl: show.image
      ? urlFor(show.image).width(600).auto("format").url()
      : show.imageUrl ?? null,
    imageAlt: show.image?.alt ?? show.imageAlt ?? show.title,
  }));

  const imageUrl = home?.image
    ? urlFor(home.image).width(800).auto("format").url()
    : home
      ? null
      : defaults.imageUrl;
  const imageAlt = home?.image?.alt ?? (home ? null : defaults.imageAlt);

  return (
    <HomePageShell
      artistFirstName={artistFirstName}
      artistLastName={artistLastName}
      details={details}
      showName={showName}
      dates={dates}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      exhibitionLink={exhibitionLink}
      links={links}
      pastShows={pastShows}
    />
  );
}
