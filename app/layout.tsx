import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/base/globals.scss";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Entertainment web app",
  description: "Entertainment web app, frontendmentor challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
