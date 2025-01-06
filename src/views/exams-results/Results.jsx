import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ReusableTable from '../../components/table/ReusableTable';
// import TableOption from '../../components/table/TableOption';
import Loader from '../../components/loader/Loader';
import EmptyTable from '../../components/table/EmptyTable';
import FilterSearch from '../../components/filter/FilterSearch';
import InputField from '../../components/control/InputField';
import SelectField from '../../components/control/SelectField';
import FormatDate from '../../components/table/FormatDate';
import { getAllResults, exportResults } from '../../api/resultsApi';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const Results = () => {
  const { state } = useAuth();
  const { token } = state;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [department, setDepartment] = useState('');
  const [testDate, setTestDate] = useState('');

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

  const columns = [
    {
      Header: 'User ID',
      accessor: 'userId',
    },
    {
      Header: 'Department',
      accessor: 'department',
    },
    {
      Header: 'General Score',
      accessor: 'generalScore',
    },
    {
      Header: 'Departmental Score',
      accessor: 'departmentalScore',
    },
    {
      Header: 'Total Score',
      accessor: 'totalScore',
    },
    {
      Header: 'Total Questions',
      accessor: 'totalQuestions',
    },
    {
      Header: 'Correct Answers',
      accessor: 'correctAnswers',
    },
    {
      Header: 'Wrong Answers',
      accessor: 'wrongAnswers',
    },
    {
      Header: 'Time Taken (mins)',
      accessor: 'timeTaken',
    },
    {
      Header: 'Faculty',
      accessor: 'faculty',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: 'Test Date',
      accessor: 'testDate',
      Cell: ({ value }) => <FormatDate value={value} />,
    },
  ];

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await getAllResults(
        token,
        pageIndex + 1,
        pageSize,
        department,
        testDate
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
    fetchResults();
  }, [pageIndex, pageSize, department, testDate]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageIndex(0);
  };

  const exportToExcel = async () => {
    try {
      setIsLoading(true);

      let allResults = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const response = await exportResults(
          token,
          currentPage,
          1000, // Larger page size for export
          department,
          testDate
        );

        if (response && response.data && response.data.length > 0) {
          allResults = [...allResults, ...response.data];
          totalPages = response.totalPages || 1;
        } else {
          totalPages = 0;
        }

        currentPage++;
      } while (currentPage <= totalPages);

      if (allResults.length > 0) {
        const mappedData = allResults.map((item) => ({
          UserID: item.userId || 'N/A',
          Department: item.department || 'N/A',
          GeneralScore: item.generalScore || 0,
          DepartmentalScore: item.departmentalScore || 0,
          TotalScore: item.totalScore || 0,
          TotalQuestions: item.totalQuestions || 0,
          CorrectAnswers: item.correctAnswers || 0,
          WrongAnswers: item.wrongAnswers || 0,
          TimeTaken: `${item.timeTaken || 0} mins`,
          Faculty: item.faculty || 'N/A',
          Role: item.role || 'N/A',
          TestDate: new Date(item.testDate).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(mappedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Exam Results');

        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        const blob = new Blob([excelBuffer], {
          type: 'application/octet-stream',
        });

        const fileName = department
          ? `exam_results_${department.toLowerCase().replace(/\s+/g, '_')}.xlsx`
          : 'exam_results_all.xlsx';

        saveAs(blob, fileName);
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
      label: 'Export Results',
      icon: <FileDownloadIcon fontSize="small" className="text-primary" />,
      onClick: exportToExcel,
    },
  ];

  return (
    <>
      <div className="flex justify-between m-8 space-x-4 items-start">
        <p className="text-primary text-2xl font-bold">Exam Results</p>
        <FilterSearch>
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Department"
              name="department"
              value={department}
              options={[
                { value: '', label: 'All Departments' },
                ...departments,
              ]}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <InputField
              type="date"
              label="Test Date"
              name="testDate"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
            />
          </div>
        </FilterSearch>
      </div>

      {isLoading ? (
        <Loader loading={isLoading} />
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : data.length === 0 ? (
        <EmptyTable columns={columns} message="No results found." />
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
    </>
  );
};

export default Results;
