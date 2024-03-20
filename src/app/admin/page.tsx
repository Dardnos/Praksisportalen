/** @format */

import Link from "next/link";
import prisma from "../module/prismaClient";
export default async function Page() {
  return (
    <main className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link
        href="/admin/administers"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Studier
      </Link>
      <Link
        href="/admin/administerTeachers"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Lærere
      </Link>
      <Link
        href="/admin/administerEmployees"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Ansatte
      </Link>
      <Link
        href="/admin/administerDepartments"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Avdelinger
      </Link>
    </main>
  );
}
