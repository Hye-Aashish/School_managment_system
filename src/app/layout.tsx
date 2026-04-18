import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/globals.css";
// import "./aos.css";
// import "./css/output.css";
import { LayoutProvider } from "@/context/LayoutContext";
import { DrawerProvider } from "@/context/DrawerContext";
import BodyClassHandler from "@/context/BodyClassHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Management Pro | Enterprise Grade Dashboard",
  description: "Modernized school administration system with premium glassmorphism UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Inter:wght@100..900&family=Poppins:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DrawerProvider>
          <LayoutProvider>
            <BodyClassHandler />
            {children}
          </LayoutProvider>
        </DrawerProvider>
      </body>
    </html>
  );
}