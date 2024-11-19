import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllPayments } from '../../api/paymentApi';
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
const Payments = () => {
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
      'payments',
      pageIndex,
      pageSize,
      //   categoryValue,
      //   depreciationRate,
    ],
    queryFn: () =>
      getAllPayments(
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
      console.error('Error fetching payments:', error);
    },
  });

  const handleFilterChange = () => {
    usersQuery.refetch();
  };

  const columns = useMemo(
    () => [
      { Header: 'Sn', accessor: (row, i) => i + 1 },
      {
        Header: 'Payment RRR',
        accessor: 'reference',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
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
            <div className="w-48">
              {`${firstName} ${middleName || ''} ${surName}`.trim()}
            </div>
          );
        },
      },
      {
        Header: 'Applicant Reg Number',
        accessor: 'userId.userId',
        Cell: ({ value }) => <div className="w-32">{value}</div>,
      },
      {
        Header: 'Applicant email',
        accessor: 'userId.email',
        Cell: ({ value }) => <div className="w-48">{value}</div>,
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

  return (
    <>
      <div className="flex justify-between m-8 space-x-4 items-start">
        <p className="text-primary text-2xl font-bold">Payments</p>
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
        {/* <div className="flex flex-row space-x-2 h-[42px]">
          <Button
            label="Create User"
            onClick={() => navigate('/app/create-cuser')}
          />
        </div> */}
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

export default Payments;
