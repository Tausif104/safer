import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "SafeRx - Email Verification",
  description: "Verify your email address to access your SafeRx account",
  icons: {
    icon: "/custom-fav.svg",
  },
};

export default function VerifyEmailLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
