import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lễ Vu Quy - Tiến Sỹ & Thu Hương",
  description:
    "Trân trọng kính mời bạn đến chung vui trong lễ cưới của Tiến Sỹ & Thu Hương.",
  keywords: [
    "wedding",
    "thiệp cưới",
    "Tiến Sỹ",
    "Thu Hương",
    "lễ cưới",
    "tình yêu",
  ],
  openGraph: {
    title: "Tiến Sỹ & Thu Hương - Thiệp Cưới",
    description:
      "Trân trọng kính mời bạn đến chung vui trong lễ cưới của Tiến Sỹ & Thu Hương.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <div className="film-grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}
