import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "SafeR-Premises Login",
  description: "Dashboard Login",
  icons: {
    icon: "/custom-fav.svg",
  },
};

export default function FormLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className='min-h-screen flex justify-center items-center px-[20px] bg-[#F8F9FB] sm:bg-[#F9FFE7]'>
          <div className='bg-[#F8F9FB] sm:bg-white w-[566px] sm:p-[40px] sm:rounded-[16px] mx-auto max-w-full md:my-8 mt-[30px] sm:mt-0'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
