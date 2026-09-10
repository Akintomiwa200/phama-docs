import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { AuthProvider } from "@/providers/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "African Metabolome Database - Multi-Domain Metabolomics Platform",
  description:
    "A multi-domain African metabolomics platform integrating plant, agricultural, livestock, environmental, and human metabolome data with spectral libraries, processed feature tables, and citable datasets.",
  icons: {
    icon: "/icon.svg",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          data-theme-init
        />
        <ThemeProvider>
          <AuthProvider>
            <ScrollManager />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}