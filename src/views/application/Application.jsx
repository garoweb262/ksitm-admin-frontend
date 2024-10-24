import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllApplications } from '../../api/applicationApi';
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
const Application = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { token } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [categoryValue, setCategoryValue] = useState('');
  const [depreciationRate, setDepreciationRate] = useState('');
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

  const usersQuery = useQuery({
    queryKey: [
      'applicantions',
      pageIndex,
      pageSize,
      //   categoryValue,
      //   depreciationRate,
    ],
    queryFn: () =>
      getAllApplications(
        token,
        pageIndex + 1,
        pageSize
        // categoryValue,
        // depreciationRate
      ),
    onSuccess: (data) => {
      console.log(data);
      setTotalPages(data.totalPages);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  const handleFilterChange = () => {
    usersQuery.refetch();
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
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>, // Display 'N/A' if null
      },
      {
        Header: 'Interview Result',
        accessor: 'interviewResult',
        Cell: ({ value }) => <div className="w-40">{value || 'N/A'}</div>, // Display 'N/A' if null
      },

      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Cell: ({ value }) => (
          <div className="w-40">
            {' '}
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
                <button
                // onClick={() => openModal(<EditCategoryForm ... />)}
                >
                  Edit
                </button>
              </li>
            </ul>
          </TableOption>
        ),
      },
    ],
    []
  );

  return (
    <>
      <p className="text-primary text-2xl font-bold">Applications</p>
      <div className="flex justify-between m-8 space-x-4 items-start">
        {/* <FilterSearch>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SelectField
                label="Category Name"
                name="name"
                value={categoryValue}
                onChange={(e) => {
                  setCategoryValue(e.target.value);
                  handleFilterChange();
                }}
              />
            </div>
            <div>
              <SelectField
                label="Depreciation Rate"
                name="depreciationRate"
                value={depreciationRate}
                onChange={(e) => {
                  setDepreciationRate(e.target.value);
                  handleFilterChange();
                }}
              />
            </div>
          </div>
        </FilterSearch> */}
      </div>

      {usersQuery.isLoading ? (
        <Loader loading={usersQuery.isLoading} />
      ) : usersQuery.data?.data?.length === 0 ? (
        <EmptyTable
          columns={columns}
          message="No applicantion records found."
        />
      ) : (
        <ReusableTable
          columns={columns}
          data={usersQuery.data?.data || []}
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
      {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Action Modal">
        {modalContent}
      </Modal> */}
    </>
  );
};
export default Application;
