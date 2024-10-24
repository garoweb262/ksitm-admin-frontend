import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllApplicants } from '../../api/applicantsApi';
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
const Applicants = () => {
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
      'applicants',
      pageIndex,
      pageSize,
      //   categoryValue,
      //   depreciationRate,
    ],
    queryFn: () =>
      getAllApplicants(
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
        Header: 'Applicant Req No',
        accessor: 'userId',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'FullName',
        accessor: (row) =>
          `${row.firstName} ${row.middleName ?? ''} ${row.surName}`,
        Cell: ({ value }) => <div className="w-60">{value}</div>,
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        Cell: ({ value }) => <div className="w-20">{value}</div>,
      },
      {
        Header: 'Email Address',
        accessor: 'email',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
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
                //   onClick={() =>
                //     openModal(
                //       <EditCategoryForm
                //         categoryId={row.original._id}
                //         rate={row.original.depreciationRate}
                //         name={row.original.name}
                //         onClose={closeModal}
                //         refetch={categoryQuery.refetch}
                //         setIsModalOpen={setIsModalOpen}
                //       />
                //     )
                //   }
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
      <div className="flex justify-between m-8 space-x-4 items-start">
        <p className="text-primary text-2xl font-bold">Applicants</p>
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
        <EmptyTable columns={columns} message="No users records found." />
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

export default Applicants;
