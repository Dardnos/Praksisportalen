/** @format */
/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudent, paginateStudents } from "./actions";

const ListOfStudents = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };

  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Students"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=student`;
        }}
        clickableColumns={clickableColumns}
        deleteFunction={deleteStudent}
        paginateFunction={paginateStudents}
      />
    </div>
  );
};

export default ListOfStudents;
