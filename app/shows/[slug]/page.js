import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { showBySlugQuery } from "@/sanity/lib/queries";
import { sanityConfigured } from "@/sanity/env";
import ShowPageShell from "../ShowPageShell";

export const revalidate = 60;

const camilleCaptions = [
  "",
  "Flower, 2026\nAcrylic, clay, marker, collage, and paper on chipboard\n38 x 38 in (96.5 x 96.5 cm)",
  "",
  "",
  "",
  "",
  "Stumbling!!, 2026\nAcrylic, alcohol ink, marker, pencil, and collage on paper, artist frame\n22 x 30.75 in (55.8 x 78 cm), 23.25 x 32 in (59 x 81.2 cm) (framed)",
  "",
  "",
  "",
  "Speech balloons, 2026\nLaminated inkjet prints, fabric, aluminum leaf, and acrylic on paper, artist frame\n17.5 x 22.25 in (44.5 x 56.5 cm), 18.5 x 23 in (47 x 58.4 cm) (framed)",
  "",
  "",
  "",
  "Streaky, 2026\nAcrylic, graphite, and collage on paper, artist frame\n22 x 30.75 in (55.8 x 78 cm), 23.25 x 32 in (59 x 81.2 cm) (framed)",
  "",
  "",
  "Untitled, 2025\nAcrylic, marker, fabric, and collage on paper\n9 x 12 in (22.8 x 30.4 cm), 11.5 x 16.25 in (29 x 41 cm) (framed)",
  "",
  "Paper rug prototype, 2026\nLaminated adhesive vinyl print on fused, greyboard\n4 x 6 ft (122 x 183 cm)",
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!sanityConfigured || !client) {
    return { title: "Show | Lulu Berlu" };
  }
  const show = await client.fetch(
    `*[_type == "show" && slug.current == $slug][0]{
      "artist": coalesce(artist, title)
    }`,
    { slug },
  );
  if (!show?.artist) {
    return { title: "Show | Lulu Berlu" };
  }
  return { title: `${show.artist} | Lulu Berlu` };
}

export default async function ShowPage({ params }) {
  const { slug } = await params;
  if (!sanityConfigured || !client) {
    notFound();
  }
  const show = await client.fetch(showBySlugQuery, { slug });

  if (!show) {
    notFound();
  }

  const images = show.images || [];
  const imageUrls = images
    .filter(Boolean)
    .map((img) => urlFor(img).width(1800).auto("format").url());
  const imageAlts = images.map((img) => img?.alt || "");

  return (
    <ShowPageShell
      artist={show.artist}
      showTitle={show.showTitle}
      pressReleaseUrl={show.pressReleaseUrl}
      pressLink={show.pressLink}
      date={show.date}
      imageUrls={imageUrls}
      imageAlts={imageAlts}
      imageCaptions={slug === "camille" ? camilleCaptions : []}
    />
  );
}
