import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";
import Logo from "../../public/Icons/logo-helse-mr";
import { getServerSession } from "next-auth";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeSwap from "./components/ThemeChanger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
/**
 * The root layout of the application.
 * @param root the root
 * @param root.children The children of the root layout.
 * @returns A page with a header and a main section decided by it's children.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col bg-base-100 text-base-content`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <ClientThemeWrapper>
            <header className="flex justify-between bg-base-200 text-base-content p-4 items-center ">
              <Link href={"/"}>
                <div className="h-10">
                  <Logo currentColor="currentColor" />
                </div>
              </Link>
              <div className="flex space-x-6 items-center">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Settings
                  </div>
                  <ul className="dropdown-content z-[1] menu p-4 shadow bg-base-300 text-base-content rounded-box w-52">
                    <li className="gap-4">
                      <ThemeSwap />
                      <LogoutButton hide={!(await getServerSession())?.user} />
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            <main className="flex flex-col py-4 h-full bg-base-100 text-base-content overflow-y-scroll scrollbar-hide">
              {children}
            </main>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
