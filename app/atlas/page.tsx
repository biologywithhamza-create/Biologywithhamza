import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "../components";
import { AtlasExplorer } from "./atlas-explorer";
export const metadata: Metadata = { title: "Interactive 3D Human Atlas", description: "Navigate adult male human anatomy in 3D. Search 2,234 structures, select body regions, toggle 15 system layers and isolate organs in the Biology with Hamza Human Atlas.", alternates: { canonical: "/atlas" } };
export default function AtlasPage() {
  return <><Header/><main id="main-content" className="atlas-page"><PageIntro eyebrow="THE HUMAN ATLAS" title="See how you’re put together." copy="One body. Thousands of connections. Explore the reference anatomy by region, organ or system, and see the relationships for yourself."/><AtlasExplorer/></main><Footer/></>;
}
