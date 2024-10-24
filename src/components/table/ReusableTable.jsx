import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import Button from '../button/Button';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ReusableTable = ({
  columns,
  buttons,
  nav,
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
          {buttons &&
            buttons.map((button, index) => (
              <Button
                key={index}
                label={button.label}
                icon={button.icon}
                onClick={button.onClick}
                type={button.type}
              />
            ))}
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

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto pb-20 no-scrollbar">
        <table
          {...getTableProps()}
          className="min-w-full bg-gray-100 overflow-x-auto "
        >
          <thead key="table-header" className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="p-4 text-left"
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
                  {...row.getRowProps()}
                  key={row.id}
                  className="border border-b-2 border-gray-300"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="p-4"
                    >
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
        <div>
          <select
            value={currentPageSize}
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
            <button
              onClick={handlePreviousPage}
              disabled={!canPreviousPage}
              className="px-4 py-2 rounded mr-2"
            >
              <ChevronLeft />
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index)}
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    currentPageIndex === index
                      ? 'bg-primary/75 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={!canNextPage}
              className="px-4 py-2 rounded"
            >
              <ChevronRight />
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
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
      type: PropTypes.oneOf(['button', 'submit', 'reset']),
    })
  ),
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
    })
  ),
};

export default ReusableTable;
