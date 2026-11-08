import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "../components";
import { AtlasExplorer } from "./atlas-explorer";
export const metadata: Metadata = { title: "Interactive 3D Human Atlas", description: "Navigate adult male human anatomy in 3D. Search reference structures, select body regions, toggle 15 system layers isolate organs and explore a kidney cutaway in the Biology with Hamza Human Atlas.", alternates: { canonical: "/atlas" } };
export default function AtlasPage() {
  return <><Header/><main id="main-content" className="atlas-page"><PageIntro eyebrow="THE HUMAN ATLAS" title="Human Atlas" copy="Explore anatomy by organ, region or system. Choose a starting view below."/><AtlasExplorer/></main><Footer/></>;
}
