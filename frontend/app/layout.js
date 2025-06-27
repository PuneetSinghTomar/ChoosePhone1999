import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Head from 'next/head'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChoosePhone: Find the Perfect Phone for You",
  description: "Confused about which phone to buy? Use ChoosePhone's powerful Phone Finder to compare specs, features, and prices. Get personalized recommendations for the best smartphones in India — fast, easy, and accurate.",
  icons: {
    icon: "/2-removebg-preview.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Best Mobile Phones in India - Compare Features & Prices | ChoosePhone</title>
        <meta
          name="description"
          content="Compare smartphones from Oppo,iphone, Samsung, Apple, Vivo, and more. Get the best deals from Amazon, Flipkart, Croma, and others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/2-removebg-preview.png" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
