import React from "react";
import DynamicTable from "./DynamicTable";
import { paginateSections } from "@/app/[lang]/(pages)/sections/action";

interface SectionTableProps {
  refreshKey?: any;
  filter?: any;
  readonly?: boolean;
  deleteFunction?: any;
  onAddButtonClick?: () => void;
}

/**
 * The SectionTable component displays a list of sections.
 * @param refreshKey The refresh key.
 * @param filter The filter object.
 * @param readonly The readonly flag.
 * @param deleteFunction The delete function.
 * @param onAddButtonClick The onAddButtonClick function.
 * @returns A list of sections.
 */
const SectionTable: React.FC<SectionTableProps> = ({
  refreshKey,
  filter,
  readonly,
  deleteFunction,
  onAddButtonClick,
}) => {
  return (
    <DynamicTable
      refreshKey={refreshKey}
      tableName={"Sections"}
      headers={{
        "Section name": "name",
        "Section Type": "sectionType",
        "Leader Email": "email",
        "Created At": "createdAt",
        "Updated At": "updatedAt",
      }}
      filter={filter}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/sections/${row.id}`;
      }}
      buttonName={"Details"}
      readonly={readonly}
      deleteFunction={deleteFunction}
      onAddButtonClick={onAddButtonClick}
      paginateFunction={paginateSections}
    />
  );
};

export default SectionTable;
