import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PYRO — Biology, MDCAT & Discovery",
    short_name: "PYRO",
    description: "Biology made clear. Discovery made relevant.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F0E6",
    theme_color: "#071018",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
