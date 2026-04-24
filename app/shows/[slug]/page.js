import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { showBySlugQuery } from "@/sanity/lib/queries";
import { sanityConfigured } from "@/sanity/env";
import ShowPageShell from "../ShowPageShell";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!sanityConfigured || !client) {
    return { title: "Show | Lulu Berlu" };
  }
  const show = await client.fetch(
    `*[_type == "show" && slug.current == $slug][0]{ title }`,
    { slug },
  );
  if (!show?.title) {
    return { title: "Show | Lulu Berlu" };
  }
  return { title: `${show.title} | Lulu Berlu` };
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
      title={show.title}
      showTitle={show.showTitle}
      pressReleaseUrl={show.pressReleaseUrl}
      pressLink={show.pressLink}
      date={show.date}
      imageUrls={imageUrls}
      imageAlts={imageAlts}
    />
  );
}
