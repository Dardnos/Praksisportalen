/** @format */
/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "./actions";

const ListOfInternshipAgreements = () => {
  const headers = {
    status: "status",
    "Start Date": "startDate",
    "End Date": "endDate",
  };

  return (
    <DynamicTable
      tableName={"Internship Agreements"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/internshipAgreements/${row.id}`;
      }}
      buttonName={"Details"}
      deleteFunction={deleteInternshipAgreement}
      paginateFunction={paginateInternshipAgreements}
    />
  );
};

export default ListOfInternshipAgreements;
