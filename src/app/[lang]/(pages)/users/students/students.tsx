"use client";
import React from "react";
import StudentTable from "@/app/_components/DynamicTables/StudentTable";

/**
 * The ListOfStudents component displays a list of students.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.user The user object.
 * @param root.educationInstitutionID The education institution ID.
 * @param root.user.id The user ID.
 * @param root.user.role The user role.
 * @returns A list of students.
 */
export default function ListOfStudents({
  wordbook,
  user,
  educationInstitutionID,
}: {
  readonly user: {
    readonly id: string;
    readonly role?: string;
  };
  readonly wordbook: { readonly [key: string]: string };
  readonly educationInstitutionID?: number;
}) {
  return (
    <StudentTable
      filter={{
        educationInstitutionID: educationInstitutionID?.toString(),
      }}
    />
  );
}
