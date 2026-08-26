import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Biology with Hamza | MDCAT & Cambridge O Level",
    template: "%s | Biology with Hamza",
  },
  description:
    "Concept-driven MDCAT and Cambridge O Level Biology lessons, articles, diagrams and student resources by Hamza Ramzan.",
  metadataBase: new URL("https://hamzaramzan.online"),
  alternates: { canonical: "https://hamzaramzan.online" },
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
        width: 1919,
        height: 820,
        alt: "Biology with Hamza",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
