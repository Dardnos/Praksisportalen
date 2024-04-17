/** @format */

"use server";
import { EmployeePaginationRequest } from "@/app/_models/Employee";
import { getEmployeeObjectsByPagination } from "@/services/Employees";
import "server-only";

export async function paginateEmployees(request: EmployeePaginationRequest) {
  return (await getEmployeeObjectsByPagination(request)).toJSON();
}
