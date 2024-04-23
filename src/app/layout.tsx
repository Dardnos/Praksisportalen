/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeChanger from "./components/ThemeChanger";
import LogoutButton from "./components/LogoutButton";
import Logo from "../../public/Icons/logo-helse-mr";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col bg-base `} suppressHydrationWarning={true}>
        <header className="flex justify-between bg-base-200 p-4 items-center ">
          <Link href={"/"}>
            <div className="h-10">
              <Logo currentColor="currentColor" />
            </div>
          </Link>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="btn  rounded-btn h-full">
              Home
            </Link>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                Settings
              </div>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                <li>
                  <ThemeChanger />
                  <LogoutButton hide={!(await getServerSession())?.user} />
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="flex flex-col py-4 h-full bg-base overflow-y-scroll scrollbar-hide">
          {children}
        </main>
      </body>
    </html>
  );
}
