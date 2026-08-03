import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: "italic",
  variable: "--font-display",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Jothem Studio — Bentengan '26 | Roblox Game & Studio",
  description:
    "Official website for Jothem Studio. Discover our upcoming Roblox game Bentengan, releasing August 17, 2026, and meet our creative team.",
  icons: {
    icon: "/jothem-logo.png",
    shortcut: "/jothem-logo.png",
    apple: "/jothem-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} font-body bg-bg text-text-primary antialiased selection:bg-[#4E85BF] selection:text-white`}
    >
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
