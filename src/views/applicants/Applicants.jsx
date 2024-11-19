import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllApplicants, exportToExcelApi } from '../../api/applicantsApi';
import { useAuth } from '../../context/AuthContext';
import ReusableTable from '../../components/table/ReusableTable';
import TableOption from '../../components/table/TableOption';
import Loader from '../../components/loader/Loader';
import EmptyTable from '../../components/table/EmptyTable';
import Modal from '../../components/modal/Modal';
import UpdateUserPassword from './components/UpdateUserPassword';
import FormatDate from '../../components/table/FormatDate';
import FilterSearch from '../../components/filter/FilterSearch';
import InputField from '../../components/control/InputField';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const Applicants = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { token } = state;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      const response = await getAllApplicants(
        token,
        pageIndex + 1,
        pageSize,
        userId || undefined
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
  }, [pageIndex, pageSize, userId]);

  const openModal = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserId(null);
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageIndex(0);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Sn',
        accessor: (row, i) => i + 1,
        Cell: ({ value }) => <div className="w-20 text-center">{value}</div>,
      },
      {
        Header: 'Applicant Req No',
        accessor: 'userId',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
      },
      {
        Header: 'FullName',
        accessor: (row) =>
          `${row.firstName} ${row.middleName ?? ''} ${row.surName}`,
        Cell: ({ value }) => <div className="w-72">{value}</div>,
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Email Address',
        accessor: 'email',
        Cell: ({ value }) => <div className="w-72">{value}</div>,
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        Cell: ({ value }) => (
          <div className="w-32">{value === 'm' ? 'Male' : 'Female'}</div>
        ),
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Nin No',
        accessor: 'nin',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Faculty',
        accessor: 'faculty',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Department',
        accessor: 'department',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
      },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Cell: ({ value }) => (
          <div className="w-40">
            <FormatDate value={value} />
          </div>
        ),
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <TableOption>
            <ul className="flex flex-col space-y-2">
              <li className="block p-2 text-sm text-primary text-left">
                <button onClick={() => openModal(row.original.userId)}>
                  Update Password
                </button>
              </li>
            </ul>
          </TableOption>
        ),
      },
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
          Charge: item.charge || 0,
          CreatedAt: new Date(item.createdAt).toLocaleString(),
          DateOfBirth: item.dateOfBirth || 'Not Provided',
          Department: item.department || 'Not Assigned',
          Email: item.email || 'Not Provided',
          ExamDate: item.examDate || 'Not Scheduled',
          ExamTime: item.examTime || 'Not Scheduled',
          ExamVenue: item.examVenue || 'Not Assigned',
          Faculty: item.faculty || 'Not Assigned',
          FirstName: item.firstName || 'N/A',
          Gender: item.gender === 'f' ? 'Female' : 'Male',
          LGA: item.lga || 'Not Provided',
          MiddleName: item.middleName || 'N/A',
          NIN: item.nin || 'N/A',
          Passport: item.passport || 'Not Uploaded',
          Phone: item.phone || 'Not Provided',
          Role: item.role || 'N/A',
          RRR: item.rrr || 'N/A',
          State: item.state || 'Not Provided',
          SurName: item.surName || 'N/A',
          UserID: item.userId || 'N/A',
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
        <p className="text-primary text-2xl font-bold">Applicants</p>
        <FilterSearch>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputField
                label="User ID"
                name="userId"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
            </div>
          </div>
        </FilterSearch>
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
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Update Password">
        <UpdateUserPassword userId={userId} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Applicants;
