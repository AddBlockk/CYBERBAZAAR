import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "../lib/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cyber Bazzar",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
