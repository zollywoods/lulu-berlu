/**
 * Seeds the homePage singleton with current Camille Klein content.
 * Requires SANITY_API_WRITE_TOKEN (or run via npm run seed:home).
 */
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "plt92cz0";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token at sanity.io/manage and run:\n" +
      "  SANITY_API_WRITE_TOKEN=your_token npm run seed:home",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-21",
  token,
  useCdn: false,
});

const homeData = {
  _id: "homePage",
  _type: "homePage",
  artistFirstName: "Camille",
  artistLastName: "Klein",
  showName: "Works on paper",
  dates: "March 14 - May 10, 2026",
  exhibitionLink: "/shows/camille",
};

async function main() {
  const imagePath = path.join(__dirname, "../public/camille.jpeg");
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image not found: ${imagePath}`);
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const asset = await client.assets.upload("image", imageBuffer, {
    filename: "camille.jpeg",
  });

  await client.createOrReplace({
    ...homeData,
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
      alt: "Camille Klein",
    },
    pastShows: [
      {
        _key: "camille-klein",
        _type: "pastShow",
        title: "Camille Klein",
        dates: "March 14 - May 10, 2026",
        link: "/shows/camille",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
          alt: "Camille Klein",
        },
      },
    ],
  });

  console.log("Home page seeded successfully (document id: homePage).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
