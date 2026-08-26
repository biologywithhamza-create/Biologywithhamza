import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Biology with Hamza — MDCAT & Cambridge O Level",
    short_name: "Biology with Hamza",
    description: "Biology made clear. Learning made relevant.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F0E6",
    theme_color: "#071018",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
