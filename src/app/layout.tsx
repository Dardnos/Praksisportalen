/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col dark:bg-neutral-900 bg-white  dark:text-neutral-200 text-black`}
      >
        <header className="flex justify-between p-4 items-center dark:bg-neutral-800 bg-blue-700 text-white">
          <Link href={"/"}>
            <Image
              src="/logo-helse-mr.svg"
              alt="Description"
              className="h-10 w-auto"
              width={100}
              height={300}
            />
          </Link>
          <div className="flex space-x-6 items-center">
            <Link
              href="/"
              className="btn btn-ghost rounded-btn dark:text-neutral-100  h-full"
            >
              Home
            </Link>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                Settings
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/">Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className="p-4 overflow-y-scroll w-full h-full">{children}</div>
      </body>
    </html>
  );
}
