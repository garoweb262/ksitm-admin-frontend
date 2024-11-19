import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllPayments, exportToExcelApi } from '../../api/paymentApi';
import { useAuth } from '../../context/AuthContext';
import ReusableTable from '../../components/table/ReusableTable';
import TableOption from '../../components/table/TableOption';
import FormatDate from '../../components/table/FormatDate';
import Loader from '../../components/loader/Loader';
import EmptyTable from '../../components/table/EmptyTable';
import Modal from '../../components/modal/Modal';
import Button from '../../components/button/Button';
import FilterSearch from '../../components/filter/FilterSearch';
import InputField from '../../components/control/InputField';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Verify from './components/Verify';
const Payments = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { token } = state;
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reference, setRrr] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPayments(
        token,
        pageIndex + 1,
        pageSize,
        reference
      );
      setData(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [pageIndex, pageSize, reference]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageIndex(0);
  };
  const columns = useMemo(
    () => [
      { Header: 'Sn', accessor: (row, i) => i + 1 },
      {
        Header: 'Payment RRR',
        accessor: 'reference',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Amount Paid',
        accessor: 'amount',
        Cell: ({ value }) => <div className="w-20">{value}</div>,
      },
      {
        Header: 'Charged Amount',
        accessor: 'chargedAmount',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentType',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Paid By',
        accessor: 'userId',
        Cell: ({ row }) => {
          const { firstName, middleName, surName } = row.original.userId;
          return (
            <div className="w-60">
              {`${firstName} ${middleName || ''} ${surName}`.trim()}
            </div>
          );
        },
      },
      {
        Header: 'Applicant Reg Number',
        accessor: 'userId.userId',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
      },
      {
        Header: 'Applicant email',
        accessor: 'userId.email',
        Cell: ({ value }) => <div className="w-72">{value}</div>,
      },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Cell: ({ value }) => (
          <div className="w-60">
            <FormatDate value={value} />
          </div>
        ),
      },
      // {
      //   Header: 'Action',
      //   Cell: ({ row }) => (
      //     <TableOption>
      //       <ul className="flex flex-col space-y-2">
      //         <li className="block p-2 text-sm text-primary text-left">
      //           <button

      //           >
      //             Edit
      //           </button>
      //         </li>
      //       </ul>
      //     </TableOption>
      //   ),
      // },
    ],
    []
  );
  const exportToExcel = async () => {
    try {
      setIsLoading(true);

      let allData = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        // Fetch data for the current page
        const response = await exportToExcelApi(token, currentPage);

        if (
          response &&
          response.status === 'success' &&
          response.data.length > 0
        ) {
          allData = [...allData, ...response.data]; // Aggregate data
          totalPages = response.totalPages || 1; // Get the total number of pages from the API response
        } else {
          totalPages = 0; // Break loop if no more pages
        }

        currentPage++;
      } while (currentPage <= totalPages);

      if (allData.length > 0) {
        // Map all API data to Excel-friendly format
        const mappedData = allData.map((item) => ({
          Amount: item.amount || 0,
          Charge: item.chargedAmount || 0,
          CreatedAt: new Date(item.createdAt).toLocaleString(),
          RRR: item.reference || 'Not Provided',
          orderId: item.orderId || 'Not Assigned',
          paymentType: item.paymentType || 'Not Provided',
          status: item.status || 'Not Scheduled',
          UserID: item.userId.userId || 'N/A',
        }));

        // Create a new workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(mappedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants');

        // Generate Excel file and trigger download
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        const blob = new Blob([excelBuffer], {
          type: 'application/octet-stream',
        });
        saveAs(blob, 'applicants_export.xlsx');

        toast.success('Export successful!');
      } else {
        toast.error('No data available to export.');
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export data.');
    } finally {
      setIsLoading(false);
    }
  };

  const nav = [
    {
      label: 'Export All',
      icon: <FileDownloadIcon fontSize="small" className="text-primary" />,
      onClick: exportToExcel,
    },
  ];
  return (
    <>
      <div className="flex justify-between m-8 space-x-4 items-start">
        <p className="text-primary text-2xl font-bold">Payments</p>
        <FilterSearch>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputField
                label="RRR"
                name="reference"
                placeholder="Enter RRR"
                value={reference}
                onChange={(e) => {
                  setRrr(e.target.value);
                }}
              />
            </div>
          </div>
        </FilterSearch>
      </div>
      <div>
        <Button
          onClick={openModal}
          label="Verify Payment"
          type="submit"
          className={`w-1/4`}
        />
      </div>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : data.length === 0 ? (
        <EmptyTable columns={columns} message="No users records found." />
      ) : (
        <ReusableTable
          columns={columns}
          data={data}
          nav={nav}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Verify Payment">
        <Verify onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Payments;
