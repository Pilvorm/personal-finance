import { Public_Sans } from "next/font/google";
import "../globals.css";
import "../style.css";

import LayoutMain from "../components/layoutMain";
import Providers from "../providers";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finance",
  description: "Personal Finance App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <Providers>
          <LayoutMain>{children}</LayoutMain>
        </Providers>
      </body>
    </html>
  );
}
