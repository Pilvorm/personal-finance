import { Public_Sans } from "next/font/google";
import "../globals.css"
import "../style.css";

import LayoutAuth from "../components/layoutAuth";

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
        <LayoutAuth>{children}</LayoutAuth>
      </body>
    </html>
  );
}
