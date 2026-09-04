import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Footer, Header, PageIntro } from "../components";
import { links } from "../content";
import { ResourceExplorer } from "./resource-explorer";
import { studentResources } from "./resources";

export const metadata: Metadata = {
  title: "Biology Student Resources",
  description: "Search 19 Biology lecture-note and exam-guide routes for MDCAT and Cambridge O Level students.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Biology Student Resources | Biology with Hamza",
    description: "An organized route into Biology lecture notes, revision materials and exam practice.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function ResourcesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Biology Student Resource Library",
    description: "An organized directory of MDCAT Biology lecture notes and Cambridge O Level study routes.",
    url: "https://hamzaramzan.online/resources",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: studentResources.length,
      itemListElement: studentResources.map((resource, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: resource.title,
        url: links.studentDrive,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <main className="resources-page">
        <PageIntro
          eyebrow="Student resource directory"
          title="The right material, without the folder hunt."
          copy="Browse the subjects first, then open the shared Student Drive for the latest lecture notes, diagrams and revision material."
        >
          <div className="library-actions">
            <a className="button button-ember" href={links.studentDrive} target="_blank" rel="noreferrer">Open Student Drive <Arrow /></a>
            <Link className="button button-ghost" href="/practice">Attempt MDCAT practice</Link>
          </div>
        </PageIntro>
        <div className="resources-shell"><ResourceExplorer /></div>
      </main>
      <Footer />
    </>
  );
}
