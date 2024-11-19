import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllApplications, exportToExcelApi } from '../../api/applicationApi';
import { useAuth } from '../../context/AuthContext';
import ReusableTable from '../../components/table/ReusableTable';
import TableOption from '../../components/table/TableOption';
import Button from '../../components/button/Button';
import FilterSearch from '../../components/filter/FilterSearch';
import DateInputField from '../../components/control/DateInputField';
import SelectField from '../../components/control/SelectField';
import FormatDate from '../../components/table/FormatDate';
import Loader from '../../components/loader/Loader';
import EmptyTable from '../../components/table/EmptyTable';
import Modal from '../../components/modal/Modal';
import InputField from '../../components/control/InputField';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const Application = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { token } = state;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllApplications(
        token,
        pageIndex + 1,
        pageSize,
        userId,
        applicationId
      );
      setData(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (err) {
      console.error('Error fetching details:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [pageIndex, pageSize, userId, applicationId]);

  // const handleFilterChange = () => {
  //   setPageIndex(0);
  //   fetchApplications();
  // };

  const columns = useMemo(
    () => [
      { Header: 'Sn', accessor: (row, i) => i + 1 },
      {
        Header: 'Applied By',
        accessor: 'userId',
        Cell: ({ row }) => {
          const userId = row.original.userId || {};
          const { firstName = '', middleName = '', surName = '' } = userId;

          return (
            <div className="w-48">
              {`${firstName} ${middleName} ${surName}`.trim()}
            </div>
          );
        },
      },
      {
        Header: 'Application ID',
        accessor: 'applicationId',
        Cell: ({ value }) => <div className="w-20">{value}</div>,
      },
      {
        Header: 'User ID',
        accessor: 'userId.userId',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Stage',
        accessor: 'stage',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Verified',
        accessor: 'isVerified',
        Cell: ({ value }) => <div className="w-32">{value ? 'Yes' : 'No'}</div>,
      },
      {
        Header: 'Rejection Reason',
        accessor: 'rejectionReason',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>, // Display 'N/A' if null
      },
      {
        Header: 'Exam Date',
        accessor: 'userId.examDate',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>,
      },
      {
        Header: 'Exam Venue',
        accessor: 'userId.examVenue',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>,
      },
      {
        Header: 'Exam Time',
        accessor: 'userId.examTime',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>,
      },
      {
        Header: 'CBT Result',
        accessor: 'cbtResult',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>,
      },
      {
        Header: 'Interview Result',
        accessor: 'interviewResult',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>,
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
                <Link to={`/app/application-details/${row.original._id}`}>
                  View
                </Link>
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

      let allAssets = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        // Fetch data for the current page
        const response = await exportToExcelApi(token, currentPage, undefined);

        if (
          response &&
          response.status === 'success' &&
          response.data.length > 0
        ) {
          allAssets = [...allAssets, ...response.data];
          totalPages = response.totalPages || 1; // Assuming `totalPages` is part of the API response
        } else {
          totalPages = 0; // Break loop if no more pages
        }

        currentPage++;
      } while (currentPage <= totalPages);

      if (allAssets.length > 0) {
        // Map all API data to Excel-friendly format
        const mappedData = allAssets.map((item) => ({
          UserID: item.userId.userId || 'N/A',
          Certificate:
            item.academicQualification
              ?.map((qual) => qual.certificate)
              .join(', ') || 'N/A',
          Institutions:
            item.institutions?.map((inst) => inst.name).join(', ') || 'N/A',
          ContactAddress: item.contactAddress?.address || 'N/A',
          ContactPhone: item.contactAddress?.phone || 'N/A',
          ContactState: item.contactAddress?.state || 'N/A',
          Country: item.country || 'N/A',
          Experience:
            item.experience
              ?.map((exp) => `${exp.name} (${exp.role})`)
              .join('; ') || 'N/A',
          Grants: item.grants?.map((grant) => grant.title).join(', ') || 'N/A',
          Hobby: item.hobby || 'N/A',
          HomeAddress: item.homeAddress?.address || 'N/A',
          HomeCity: item.homeAddress?.city || 'N/A',
          ProfessionalAchievements: item.professionalAchievement || 'N/A',
          Publications:
            item.publication?.map((pub) => pub.title).join(', ') || 'N/A',
          Referees:
            item.referees
              ?.map((ref) => `${ref.name} (${ref.portfolio})`)
              .join('; ') || 'N/A',
          Stage: item.stage || 'N/A',
          Status: item.status || 'N/A',
          Honors: item.honors?.map((honor) => honor.name).join(', ') || 'N/A',
          Inventions:
            item.inventions?.map((inv) => inv.title).join(', ') || 'N/A',
          Services:
            item.service
              ?.map((serv) => `${serv.bodyName} (${serv.role})`)
              .join(', ') || 'N/A',
          State: item.state || 'N/A',
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
      <p className="text-primary text-2xl font-bold">Applications</p>
      <div className="flex justify-between m-8 space-x-4 items-start">
        <FilterSearch>
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <InputField
                label="User ID"
                name="userId"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
            </div> */}
            <div>
              <InputField
                label="Application ID"
                name="applicationId"
                placeholder="Enter Application ID"
                value={applicationId}
                onChange={(e) => {
                  setApplicationId(e.target.value);
                }}
              />
            </div>
          </div>
        </FilterSearch>
      </div>

      {isLoading ? (
        <Loader loading={isLoading} />
      ) : error ? (
        <p className="text-red-500">Error loading data: {error.message}</p>
      ) : data.length === 0 ? (
        <EmptyTable columns={columns} message="No application records found." />
      ) : (
        <ReusableTable
          columns={columns}
          data={data}
          nav={nav}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={(newPage) => setPageIndex(newPage)}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageIndex(0);
          }}
        />
      )}
      {/* Modal */}
    </>
  );
};

export default Application;
