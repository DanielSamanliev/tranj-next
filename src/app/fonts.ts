import { Inter, Playfair } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const playfair = Playfair({
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});
