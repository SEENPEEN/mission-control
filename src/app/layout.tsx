import type { Metadata } from "next";
import { Space_Mono, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { MusicProvider } from "@/context/MusicContext";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Project management for vibe coders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <AppProvider>
          <MusicProvider>{children}</MusicProvider>
        </AppProvider>
      </body>
    </html>
  );
}
