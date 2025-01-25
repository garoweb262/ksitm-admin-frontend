import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

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
  const [filters, setFilters] = useState({
    applicationId: '',
    status: '',
    stage: '',
    faculty: '',
    department: '',
    role: '',
    userId: '',
  });

  const roleOptions = [
    { value: 'Senior Lecturer', label: 'Senior Lecturer' },
    { value: 'Lecturer I', label: 'Lecturer I' },
    { value: 'Lecturer II', label: 'Lecturer II' },
    { value: 'Lecturer III', label: 'Lecturer III' },
    { value: 'Senior Instructor', label: 'Senior Instructor' },
    { value: 'Technologist I', label: 'Technologist I' },
    { value: 'Lecturer IM', label: 'Lecturer IM' },
    { value: 'Lecturer IIE', label: 'Lecturer IIE' },
    { value: 'Lecturer IE', label: 'Lecturer IE' },
    { value: 'Lecturer IIM', label: 'Lecturer IIM' },
    { value: 'Lecturer IIL', label: 'Lecturer IIL' },
  ];

  const departments = [
    {
      value: 'Library and Information Science',
      label: 'Library and information science',
    },
    { value: 'Computer Engineering', label: 'Computer engineering' },
    { value: 'Computer Science', label: 'Computer science' },
    { value: 'Electrical Engineering', label: 'Electrical engineering' },
    { value: 'Accountancy', label: 'Accountancy' },
  ];

  const faculties = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Management', label: 'Management' },
    { value: 'General Studies', label: 'General Studies' },
  ];

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
        filters
      );

      // Filter out Principal Officers and their roles
      const filteredData = response.data.filter(
        (item) =>
          item.userId?.faculty !== 'Principal Officers' &&
          item.userId?.role !== 'Rector' &&
          item.userId?.role !== 'Bursar'
      );

      setData(filteredData || []);
      setTotalPages(response.totalPages || 0);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [pageIndex, pageSize, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPageIndex(0);
  };

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
        Header: 'Faculty',
        accessor: 'userId.faculty',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Department',
        accessor: 'userId.department',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Role',
        accessor: 'userId.role',
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
                <Link
                  to={`/app/application-details/${row.original._id}`}
                  state={{ applicationData: row.original }}
                >
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
      const response = await exportToExcelApi(token, 1, 1000, filters);

      if (response.data && response.data.length > 0) {
        // Map all API data to Excel-friendly format
        const mappedData = response.data.map((item) => ({
          UserID: item.userId.userId || 'N/A',
          Faculty: item.userId.faculty || 'N/A',
          Department: item.userId.department || 'N/A',
          Role: item.userId.role || 'N/A',
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
        const fileName = filters.department
          ? `applications_${filters.department
              .toLowerCase()
              .replace(/\s+/g, '_')}.xlsx`
          : 'applications_all.xlsx';

        saveAs(blob, fileName);
        toast.success('Export successful!');
      } else {
        toast.error('No data available to export.');
      }
    } catch (error) {
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
        <p className="text-primary text-2xl font-bold">Applications</p>
        <FilterSearch>
          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="User ID"
              name="userId"
              value={filters.userId}
              onChange={handleFilterChange}
              placeholder="Enter User ID"
            />
            <InputField
              label="Application ID"
              name="applicationId"
              value={filters.applicationId}
              onChange={handleFilterChange}
              placeholder="Enter Application ID"
            />
            <SelectField
              label="Faculty"
              name="faculty"
              value={filters.faculty}
              options={[{ value: '', label: 'All Faculties' }, ...faculties]}
              onChange={handleFilterChange}
            />
            <SelectField
              label="Department"
              name="department"
              value={filters.department}
              options={[
                { value: '', label: 'All Departments' },
                ...departments,
              ]}
              onChange={handleFilterChange}
            />
            <SelectField
              label="Role"
              name="role"
              value={filters.role}
              options={[{ value: '', label: 'All Roles' }, ...roleOptions]}
              onChange={handleFilterChange}
            />
            <Button
              type="button"
              label="Clear Filters"
              onClick={() => {
                setFilters({
                  applicationId: '',
                  status: '',
                  stage: '',
                  faculty: '',
                  department: '',
                  role: '',
                  userId: '',
                });
                setPageIndex(0);
              }}
              className="mt-6"
            />

            <Button
              type="button"
              label="Export Filtered"
              onClick={exportToExcel}
              icon={<FileDownloadIcon fontSize="small" />}
              className="mt-6"
            />
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
