import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PYRO | Biology, MDCAT & Discovery",
    template: "%s | PYRO",
  },
  description:
    "Biology made clear and discovery made relevant. MDCAT lessons, biology explainers and field notes by Hamza Ramzan.",
  metadataBase: new URL("https://hamza-biology.teamdatanp.chatgpt.site"),
  alternates: { canonical: "https://hamzaramzan.online" },
  authors: [{ name: "Hamza Ramzan", url: "https://hamzaramzan.online" }],
  creator: "Hamza Ramzan",
  openGraph: {
    title: "PYRO | Biology, MDCAT & Discovery",
    description: "Biology made clear. Discovery made relevant.",
    type: "website",
    siteName: "PYRO",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PYRO — Biology, MDCAT & Discovery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PYRO | Biology, MDCAT & Discovery",
    description: "Biology made clear. Discovery made relevant.",
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
