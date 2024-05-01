/** @format */
"use server";

import {
  EducationInstitutionPageRequest,
  EducationInstitution,
} from "@/app/_models/EducationInstitution";
import { PageResponse } from "@/app/_models/pageinition";
import DBclient from "@/knex/config/DBClient";
import { EducationInstitutionTable } from "knex/types/tables.js";

async function getEducationInstitutionByID(
  id: number,
): Promise<EducationInstitutionTable> {
  const institutes = await getEducationInstitutionByIDList(new Set([id]));
  if (!institutes.get(id)) {
    throw new Error("Education Institution not found");
  }
  return institutes.get(id);
}

async function getEducationInstitutionByIDList(
  idList: Set<number>,
): Promise<Map<number, EducationInstitutionTable>> {
  const query = await DBclient.select()
    .from<EducationInstitutionTable>("educationInstitutions")
    .whereIn("id", Array.from(idList));
  const educationInstitutions: Map<number, EducationInstitutionTable> =
    new Map();
  for (const educationInstitution of query) {
    educationInstitutions.set(educationInstitution.id, {
      ...educationInstitution,
    });
  }
  return educationInstitutions;
}

async function getEducationInstitutionsByPageRequest(
  pageRequest: EducationInstitutionPageRequest,
): Promise<PageResponse<EducationInstitution>> {
  const baseQuery = await DBclient.select("")
    .from<EducationInstitutionTable>("educationInstitutions")
    .where((builder) => {
      if (pageRequest.containsName != "" && pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(
      ["id", "name"].includes(pageRequest.sort) ? pageRequest.sort : "id",
    );
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return {
    ...pageRequest,
    elements: await createEducationInstitutionObject(pageQuery),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  };
}

async function createEducationInstitutionObject(
  query: EducationInstitution[],
): Promise<EducationInstitution[]> {
  const educationInstitutions = [];
  query.forEach((educationInstitution) => {
    educationInstitutions.push({
      ...educationInstitution,
    });
  });
  return educationInstitutions;
}

async function deleteEducationInstitutionByID(id: number) {
  try {
    const deletedCount = await DBclient.delete()
      .from("educationInstitutions")
      .where("id", id);
    if (deletedCount === 0) {
      throw new Error(`Education institution with id ${id} not found`);
    }
  } catch (error) {
    if (error.message.includes("foreign key constraint")) {
      throw new Error(
        `Cannot delete education institution because it is referenced by internship Agreements`,
      );
    }
    throw new Error(
      "An error occurred while deleting the education institution",
    );
  }
}

export {
  getEducationInstitutionByID,
  getEducationInstitutionByIDList,
  getEducationInstitutionsByPageRequest,
  createEducationInstitutionObject,
  deleteEducationInstitutionByID,
};
