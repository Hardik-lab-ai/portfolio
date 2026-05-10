import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "./ThemeContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hardik Nakrani — Senior Project Manager | Solar EPC & Construction",
  description:
    "Senior Project Manager with 5+ years leading 50+ MW solar EPC projects valued at $100M+. Expert in Construction Engineering, Renewable Energy & Sustainable Development.",
  keywords: [
    "Hardik Nakrani",
    "Project Manager",
    "Solar EPC",
    "Construction Engineering",
    "Jersey City",
    "Inland Supreme Constructions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);})();` }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        style={{
          background: "var(--bg-page)",
          color: "var(--text-1)",
          fontFamily: "var(--font-body)",
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
