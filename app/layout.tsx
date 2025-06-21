import type { Metadata } from "next";
import { Poppins, Faculty_Glyphic } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "InvoiceeAI",
  description: "An AI based Invoicee generator that helps in generating invoice manually or using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${facultyGlyphic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
