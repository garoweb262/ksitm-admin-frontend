import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const EmptyTable = ({
  columns,
  message,
  data = [],
  pageIndex,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  nav,
}) => {
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

      <table className="min-w-full bg-gray-100">
        <thead className="bg-gray-200">
          {columns.map((column, index) => (
            <th
              key={index}
              className="p-4 text-start border border-b-2 border-gray-300"
            >
              {column.Header}
            </th>
          ))}
        </thead>
        <tbody className="w-full py-6 md:w-60 bg-gray-200">
          <tr>
            <td
              colSpan={columns.length}
              className="p-4 font-semibold text-center"
            >
              {message}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
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
            disabled={pageIndex === 0}
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
            disabled={pageIndex === totalPages - 1}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

EmptyTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  nav: PropTypes.array,
};

export default EmptyTable;
