/** @format */
/** @format */

"use client";
import React, { useState, useEffect, use } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { UserPageRequest } from "@/app/_models/pageinition";
import { paginateCoordinators } from "./actions";

const ListOfUsers = ({ role }: { role: string }) => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [totalElements, setTotalElements] = useState(0);
  const url = `/api/${role}s`;
  const [page, setPage] = useState(0);
  useEffect(() => {
    const request = new UserPageRequest(page, 10, sortedBy, ["name", "email"]);

    paginateCoordinators(request.toJSON()).then((data) => {
      setTotalElements(data.totalElements);
      const rows = data.elements.map((element) => ({
        ...element,
      }));
      setUsers(rows);
    });
  }, [page, sortedBy]);

  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={users}
        setRows={setUsers}
        tableName={role + "s"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/admin/addUser?role=${role}`;
        }}
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        url={url + "/"}
        page={page}
        setPage={setPage}
        totalElements={totalElements}
      />
    </div>
  );
};

export default ListOfUsers;
