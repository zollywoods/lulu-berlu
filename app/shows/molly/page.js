import fs from "fs";
import path from "path";
import ShowPageShell from "../ShowPageShell";

export const revalidate = 60;

const ARTIST = "Molly Zuckerman-Hartung";
const SHOW_TITLE = "Parallel";
const DATE = "September 19 - November 22, 2026";

const CAPTIONS = {
  "MZH_1_L Bracket.jpg":
    "L Bracket, 2024\nTwo sticks of pine, different widths, one screw, wood glue\n7 ½ x 16 ½ x ¾ in (19.1 x 41.9 x 1.9 cm)",
  "MZH_4_Opening Exercise.jpg":
    "Opening Exercise, 2026\nClay coat paper from MG and BK, latex paint, ribbon\nDimensions variable",
  "MZH_5_Canaan, CT.jpg":
    "Canaan, CT, 2020–2026\nPlaster wrap, burlap, string, snakeskin, paintbrush, L bracket\n27 ½ x 10 ¼ x 16 ⅝ in (69.9 x 26.0 x 42.2 cm)",
  "MZH_6_A Roof.jpg":
    "A Roof, 2024\nCardboard, cloth, offcuts from studio construction,\nsticks of pine, screws\n30 ¼ x 23 ½ x 7 in (76.8 x 59.7 x 17.8 cm)",
  "MZH_9_Hugo Ball.jpg":
    "Hugo Ball, 2026\nBurlap, copper, wire\n27 x 8 ¾ x 3 in (68.6 x 22.2 x 7.6 cm)",
  "MZH_10_Labor.jpg":
    "Labor, 2024\nSardine boxes, tempera paint, aluminum cans and plastic wire coating, stripped by scrappers found in Albuquerque NM,\nL bracket\n53 ¼ x 13 ½ x 14 in (135.3 x 34.3 x 35.6 cm)",
  "MZH_12_Canopy.jpg":
    "Canopy, 2025\nScrap wood, toothpicks, cotton and polyester silk,\nacrylic paint, spray paint, offcuts from studio construction\n8 x 22 ½ x 4 ⅜ in (20.3 x 57.2 x 11.1 cm)",
  "MZH_16_One, Two, Three.jpg":
    "One, Two, Three, 2025\nScreenprint on linen, two L brackets\n49 x 15 ½ x 18 ¼ in (124.5 x 39.4 x 46.4 cm)",
  "MZH_17_Moons over my Hammy.jpg":
    "Moons over my Hammy, 2026\nTiles from Laurel Way Extension, wood, canvas, burnout velvet excess from sofa\nObject: 24 ¼ x 11 x 4 in (61.6 x 27.9 x 10.2 cm); Mat: 11 ¾ x 44 ¼ in (29.8 x 112.4 cm)",
  "MZH_19_In-House, Out-House.jpg":
    "In-House, Out-House, 2026\nOffcuts from Chas’ composting toilet, wallpaper from\nLaurel Way, Extension, string, scrap wood, two L brackets\n23 x 15 x 14 in (58.4 x 38.1 x 35.6 cm)",
  "MZH_22_Tracks.jpg":
    "Tracks, 2026\nLinen, composting toilet offcuts, spray paint, wire, two L brackets\n98 x 30 x 8 in (248.9 x 76.2 x 20.3 cm)",
  "MZH_25_Four.jpg":
    "Four, 2026\nSand from Saugatuck MI, Dirt from Chatham, NY,\nframe made of offcuts from Chas’ composting toilet\n13 ⅞ x 11 ⅜ x 1 in (35.2 x 28.9 x 2.5 cm)",
  "MZH_27_Installation.jpg":
    "“A Restaging of Blinky Palermo’s Wandmalerei auf gegenüberliegenden Wanden (Mural Painting on Opposite Walls), 1971” This iconic wall painting is adapted for Ridgewood, Queens, at 50-62 Madison, a foyer in a rent-controlled apartment, 2026\nLatex house paint, cardboard, nails\nDimensions variable",
  "MZH_34_Installation.jpg":
    "Being There, 2026\nWood, steel, tyvek, paper, lamp parts, leather\n104 x 47 x 11 ½ in (264.2 x 119.4 x 29.2 cm)",
  "MZH_31_LD_Group Material.jpg":
    "Group Material meeting minutes, July 29, 1980, 2026\nOlivetti Valentine typewriter, paper\n11 x 8 ½ in (27.9 x 21.6 cm)",
};

function mollyImages() {
  const dir = path.join(process.cwd(), "public", "molly");
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort((a, b) => {
      const number = (name) => Number(name.match(/MZH_(\d+)/)?.[1] ?? 9999);
      return number(a) - number(b) || a.localeCompare(b);
    });
}

export function generateMetadata() {
  return { title: `${ARTIST} | Lulu Berlu` };
}

export default function MollyShowPage() {
  const files = mollyImages();

  return (
    <ShowPageShell
      artist={ARTIST}
      showTitle={SHOW_TITLE}
      date={DATE}
      pressReleaseUrl="/molly.pdf"
      reviewLink="https://brooklynrail.org/2026/10/artseen/molly-zuckerman-hartung-parallel/"
      reviewLabel="Brooklyn Rail"
      imageUrls={files.map((file) => `/molly/${encodeURIComponent(file)}`)}
      imageAlts={files.map((file) =>
        file.replace(/\.[^.]+$/, "").replace(/^MZH_\d+_/, ""),
      )}
      imageCaptions={files.map((file) => CAPTIONS[file] || "")}
    />
  );
}
