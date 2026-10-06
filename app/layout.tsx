import { AppearanceSync } from "./appearance";
import { LearningHistory } from "./recent-learning";
import { appearanceBootstrap } from "./appearance-bootstrap";
import type { Metadata } from "next";
import "./globals.css";
import "./activity-upgrade.css";
import "./atlas/atlas-upgrade.css";

export const metadata: Metadata = {
  title: {
    default: "Biology with Hamza | MDCAT & Cambridge O Level",
    template: "%s | Biology with Hamza",
  },
  description:
    "Concept-driven MDCAT and Cambridge O Level Biology lessons, articles, diagrams and student resources by Hamza Ramzan.",
  metadataBase: new URL("https://hamzaramzan.online"),
  authors: [{ name: "Hamza Ramzan", url: "https://hamzaramzan.online" }],
  creator: "Hamza Ramzan",
  openGraph: {
    title: "Biology with Hamza | MDCAT & Cambridge O Level",
    description: "Biology made clear. Learning made relevant.",
    type: "website",
    siteName: "Biology with Hamza",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Biology with Hamza — MDCAT and Cambridge O Level Biology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biology with Hamza | MDCAT & Cambridge O Level",
    description: "Biology made clear. Learning made relevant.",
    images: ["/og.png"],
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: appearanceBootstrap }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <AppearanceSync />
        <LearningHistory />
      </body>
    </html>
  );
}

import "./site-upgrade.css";

import "./theme-surfaces.css";
import "./appearance.css";

import "./revision/revision.css";

import "./learning-upgrade.css";
import "./next-update.css";
