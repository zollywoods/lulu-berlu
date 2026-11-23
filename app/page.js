import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";
import { sanityConfigured } from "@/sanity/env";
import HomePageShell from "./HomePageShell";

export const revalidate = 10;

const defaults = {
  artist: "Mona Varichon",
  details: null,
  showTitle: "Remakes",
  dates: "January 17 – March 14, 2027",
  imageUrl: "/VC_Monaflyer.jpg",
  imageAlt: "Mona Varichon",
  exhibitionLink: "",
  links: [],
  pastShows: [
    {
      artist: "Molly Zuckerman-Hartung",
      showTitle: "Parallel",
      dates: "September 19 - November 22, 2026",
      link: "/shows/molly",
      imageUrl: "/mollys.jpeg",
      imageAlt: "Molly Zuckerman-Hartung",
    },
    {
      artist: "Park Plays",
      showTitle: "co-presented with Fabrizio…",
      dates: "June 21 & June 28, 2026",
      link: "/parkplays.pdf",
      imageUrl: "/hannahsplay.jpeg",
      imageAlt: "Park Plays",
    },
    {
      artist: "Camille Klein",
      showTitle: "Works on Paper",
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

  const artist = home?.artist ?? defaults.artist;
  const details = home?.details ?? defaults.details;
  const showTitle = home?.showTitle ?? (home ? null : defaults.showTitle);
  const dates = home?.dates ?? defaults.dates;
  const exhibitionLink =
    home?.exhibitionLink === "/molly.pdf"
      ? "/shows/molly"
      : (home?.exhibitionLink ?? defaults.exhibitionLink);
  const links = home?.links ?? defaults.links;
  const pastShows = (home?.pastShows ?? defaults.pastShows).map((show) => ({
    artist: show.artist,
    showTitle: show.showTitle ?? null,
    dates: show.dates,
    link: show.link,
    imageUrl: show.image
      ? urlFor(show.image).width(600).auto("format").url()
      : show.imagePath ?? show.imageUrl ?? null,
    imageAlt: show.image?.alt ?? show.imageAlt ?? show.artist,
  }));

  const imageUrl = home?.image
    ? urlFor(home.image).width(800).auto("format").url()
    : home?.imagePath ?? (home ? null : defaults.imageUrl);
  const imageAlt =
    home?.image?.alt ?? home?.artist ?? (home ? null : defaults.imageAlt);

  return (
    <HomePageShell
      artist={artist}
      details={details}
      showTitle={showTitle}
      dates={dates}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      exhibitionLink={exhibitionLink}
      links={links}
      pastShows={pastShows}
    />
  );
}
