import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import Button from "../button/Button";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ReusableTable = ({ columns, buttons, nav, data, pageIndex, pageSize, totalPages, onPageChange, onPageSizeChange }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex }, // Set initial page index
      manualPagination: true,
      pageCount: totalPages,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex: currentPageIndex, pageSize: currentPageSize },
  } = tableInstance;
  const handleNextPage = () => {
    if (canNextPage) {
      onPageChange(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (canPreviousPage) {
      onPageChange(currentPageIndex - 1);
    }
  };
  return (
    <div className="m-10 rounded">
      {/* Header actions: Search and Buttons */}
      <div className="flex justify-end items-center mb-4">
        <div></div>
        <div className="space-x-4">
          {buttons && buttons?.map((button, index) => (
            <Button
              key={index}
              label={button.label}
              icon={button.icon}
              onClick={button.onClick}
              type={button.type}
            />
          ))}
         <div className="flex flex-row space-x-4">
  {nav && nav.map((na, index) => (
    <div key={index} className="flex items-center space-x-2 cursor-pointer">
      {na.icon && <span>{na.icon}</span>}
      <span className="text-primary text-sm">{na.label}</span>
    </div>
  ))}
</div>

        </div>
      </div>

      {/* Table */}
      <table {...getTableProps()} className="min-w-full bg-gray-100">
      <thead key="table-header" className="bg-gray-200">
  {headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} key={column.id} className="p-4 text-left">
          {column.render("Header")}
        </th>
      ))}
    </tr>
  ))}
</thead>

<tbody {...getTableBodyProps()}>
  {page.map((row) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()} key={row.id || row.values.someUniqueField} className="border border-b-2 border-gray-300">
        {row.cells.map((cell) => (
          <td
            {...cell.getCellProps()}
            key={`${row.original.someUniqueField}-${cell.column.id}`}
            className="p-4"
          >
            {cell.render("Cell")}
          </td>
        ))}
      </tr>
    );
  })}
</tbody>

</table>



      {/* Pagination */}
      <div className="flex justify-between items-center p-4">
      <div>
      <select
  value={pageSize}
  onChange={(e) => onPageSizeChange(Number(e.target.value))}
  className="p-2 rounded-md"
>
  {[10, 20, 30, 40, 50].map((size) => (
    <option key={size} value={size}>
      Show {size}
    </option>
  ))}
</select>

        </div>
        <div className="flex flex-row space-x-2">
        
      <div className="flex items-center">
        {/* Previous Page Button */}
        <button
          onClick={handlePreviousPage} disabled={!canPreviousPage}
          className="px-4 py-2 rounded mr-2"
        >
          <ChevronLeft /> {/* Left Arrow Icon */}
        </button>

        {/* Page Number */}
        <div className="px-2">
        Page {currentPageIndex + 1} of {totalPages}
        </div>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage} disabled={!canNextPage}
          className="px-4 py-2 rounded"
        >
          <ChevronRight /> {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
       
       
      </div>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired, 
  setFilter: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
      type: PropTypes.oneOf(["button", "submit", "reset"]),
    })
  ),
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
    }))
};

export default ReusableTable;
