import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "800"] });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Mem Connects - Your Gateway to UK Higher Education",
  description: "Mem Connects is a leading educational consultancy in London, UK, specializing in helping students gain admission to top universities in England.",
  keywords: "study in UK, study in England, UK education consultancy, Mem Connects, student consultancy London, UK university admission, study in London",
  openGraph: {
    type: "website",
    url: "https://www.memconnects.co.uk/",
    title: "Mem Connects - Your Gateway to UK Higher Education",
    description: "Expert educational consultancy in London helping students secure admission to top UK universities.",
    images: ["https://www.memconnects.co.uk/img/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mem Connects - Your Gateway to UK Higher Education",
    description: "Expert educational consultancy in London helping students secure admission to top UK universities.",
    images: ["https://www.memconnects.co.uk/img/og-image.jpg"],
  },
  icons: {
    icon: "/img/fev.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${roboto.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-white text-gray-800 antialiased min-h-screen flex flex-col font-sans">
        <Topbar />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
