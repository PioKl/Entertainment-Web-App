import type { Metadata } from "next";
import { Outfit } from "next/font/google";
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
      <body className={`${outfit.className} wrapper`}>{children}</body>
    </html>
  );
}
