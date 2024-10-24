import React from "react";
import PropTypes from "prop-types";
import { useTable, usePagination } from "react-table";
import Button from "../button/Button";
import { ChevronLeft, ChevronRight, Inbox } from "@mui/icons-material";

const EmptyTable = ({
  columns,
  message, // Add message prop for custom messages
  data = [], // Default to an empty array if no data is passed
  pageIndex,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex },
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
    state: { pageIndex: currentPageIndex },
  } = tableInstance;

  return (
    <div className="m-10 rounded">
      <table {...getTableProps()} className="min-w-full bg-gray-100">
        <thead className="bg-gray-200">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id} className="p-4 text-left">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="w-full py-6 md:w-60 bg-gray-200 ">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 font-semibold text-center">
                {message} {/* Display the message prop */}
              </td>
            </tr>
          ) : (
            page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.column.id} className="p-4">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination (Optional) */}
      {/* Add your pagination UI here if needed */}
    </div>
  );
};

EmptyTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string, // Add prop type for message
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};


export default EmptyTable;
