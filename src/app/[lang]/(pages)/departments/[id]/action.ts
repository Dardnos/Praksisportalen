"use server";

import DBclient from "@/knex/config/DBClient";
import { getDepartmentObjectByID } from "@/services/DepartmentService";
import "server-only";

export async function fetchDepartmentDetails(id: string) {
  const response = await DBclient.select("*")
    .from("departments")
    .where("id", id)
    .first();

  return await getDepartmentObjectByID(response.id);
}
