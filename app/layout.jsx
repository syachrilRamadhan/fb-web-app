import { Fredoka } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-fredoka" });

export const metadata = {
  title: "Family Battery",
  description: "Toko aki terpercaya di pondok jagung",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fredoka.className}>
        <Header />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
