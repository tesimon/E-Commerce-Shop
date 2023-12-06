import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./navbar/page";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "E-commerce shop",
  description:
    "E-commerce shop, Spend your money cos you can save more than 50% on your shopping experience with us",
};

export default function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <body className={inter.className}>
        <SessionProvider>
          <Nav />
          <main className="max-w-[1300px] px-4 mx-auto">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
