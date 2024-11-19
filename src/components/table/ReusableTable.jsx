import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ReusableTable = ({
  nav,
  columns,
  data,
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
  } = tableInstance;

  return (
    <div className="m-10 rounded">
      {/* Header actions: Search and Buttons */}
      <div className="flex justify-end items-center mb-4">
        <div></div>
        <div className="space-x-4">
          <div className="flex flex-row space-x-4">
            {nav &&
              nav.map((na, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={na.onClick}
                >
                  {na.icon && <span>{na.icon}</span>}
                  <span className="text-primary text-sm">{na.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto pb-20">
        <table {...getTableProps()} className="min-w-full bg-gray-100">
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="p-4 text-start border border-b-2 border-gray-300"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className="border border-b-2 border-gray-300"
                  {...row.getRowProps()}
                  key={row.id}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="p-2 rounded-md"
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="flex space-x-1">
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-3 py-1 rounded ${
                i === pageIndex ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!canNextPage}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default ReusableTable;
