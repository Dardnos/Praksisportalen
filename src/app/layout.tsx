/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import ThemeChanger from "./components/ThemeChanger";
import { checkUserRole } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";

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
      <body className={`${inter.className} flex flex-col`}>
        <header className="flex justify-between bg-base-200 p-4 items-center ">
          <Link href={"/"}>
            <Image
              src="/logo-helse-mr.svg"
              alt="Description"
              className="h-10 w-auto "
              width={100}
              height={300}
              priority={true} // {false} | {true}
            />
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
                  {await checkUserRole() !== "none" ? <LogoutButton/> : null}
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="p-4 overflow-y-scroll w-full h-full">{children}</main>
      </body>
    </html>
  );
}
