import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import AuthDropdown from "@/components/AuthDropdown";
import Navigation from "@/components/Navigation";
import MobileNavigation from "@/components/MobileNavigation";

const geistSans = localFont({
  src: [
    { path: "/fonts/Geist/webfonts/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/Geist/webfonts/Geist-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "/fonts/GeistMono/webfonts/GeistMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/GeistMono/webfonts/GeistMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechFlow Solutions",
  description: "DevSecOps Consulting Company Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        
          {/* Header with navigation */}
          <header className="sticky top-0 z-50 w-full bg-[#0a2540] shadow-lg border-b border-[#1a1446]">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 font-bold text-xl text-white">
                <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-[#0a2540] font-mono text-lg shadow-md">TF</span>
                <span className="hidden sm:inline text-white tracking-tight">TFlow</span>
              </Link>
              
              {/* Left navigation */}
              <div className="hidden lg:block ml-1">
                <Navigation />
              </div>
              
              {/* Right side: login, signup, demo */}
              <div className="flex items-center gap-3">
                {/* Login */}
                <AuthDropdown />
                {/* Book a live demo */}
                <Link href="#" className="hidden sm:inline-block bg-gradient-to-r from-blue-600 to-sky-400 text-white font-bold px-4 py-2 shadow rounded-full transition-all duration-200 hover:bg-white hover:text-[#0a2540] hover:scale-105 focus:scale-105 active:scale-95 animate-pulse text-sm">Book a live demo</Link>
                {/* Mobile menu */}
                <MobileNavigation />
              </div>
            </nav>
          </header>
          
          {/* Main content */}
          <main className="max-w-7xl mx-auto px-4 py-12">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="w-full py-8 text-center text-[var(--foreground)] text-base border-t border-[var(--primary)] bg-[var(--background)] mt-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
              <div>
                &copy; {new Date().getFullYear()} TechFlow Solutions. Inspired by <a href="https://snyk.io" className="text-[var(--accent)] hover:underline">Snyk</a>.
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="hover:text-[var(--accent)]">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-[var(--accent)]">Terms of Service</Link>
              </div>
            </div>
          </footer>
        
      </body>
    </html>
  );
}
