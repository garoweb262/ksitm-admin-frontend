import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
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
import { getAllComplains } from '../../api/complain';
import Reply from './forms/Reply';
const Help = () => {
  const navigate = useNavigate();
  // const { state } = useAuth();
  // const { token } = state;
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const openModal = (userId, fullname, email) => {
    setIsOpen(true);
    setUserId(userId);
    setFullname(fullname);
    setEmail(email);
  };
  const closeModal = () => {
    setIsOpen(false);
    setUserId(null);
    setFullname(null);
    setEmail(null);
  };

  const helpsQuery = useQuery({
    queryKey: [
      'helps',
      pageIndex,
      pageSize,
      //   categoryValue,
      //   depreciationRate,
    ],
    queryFn: () =>
      getAllComplains(
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
      console.error('Error fetching users:', error);
    },
  });

  const handleFilterChange = () => {
    usersQuery.refetch();
  };

  const columns = useMemo(
    () => [
      { Header: 'Sn', accessor: (row, i) => i + 1 },
      {
        Header: 'User ID',
        accessor: 'userId',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Full Name',
        accessor: 'fullname',
        Cell: ({ value }) => <div className="w-40">{value ?? ''}</div>,
      },
      {
        Header: 'Email Address',
        accessor: 'email',
        Cell: ({ value }) => <div className="w-40">{value ?? ''}</div>,
      },

      {
        Header: 'Complain',
        accessor: 'complain',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
      },
      {
        Header: 'Reply',
        accessor: 'reply',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
      },
      {
        Header: 'Reply Sent',
        accessor: 'isReply',
        Cell: ({ value }) => <div className="w-40">{value}</div>,
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
                  onClick={() =>
                    openModal(
                      row.original.userId,
                      row.original.fullname,
                      row.original.email
                    )
                  }
                >
                  Reply
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
        <p className="text-primary text-2xl font-bold">Complains</p>
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

      {helpsQuery.isLoading ? (
        <Loader loading={helpsQuery.isLoading} />
      ) : helpsQuery.data?.data?.length === 0 ? (
        <EmptyTable columns={columns} message="No complain records found." />
      ) : (
        <ReusableTable
          columns={columns}
          data={helpsQuery.data?.data || []}
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
      {isOpen && (
        <Modal title="Send Reply" isOpen={isOpen} onClose={closeModal}>
          <Reply
            fullname={fullname}
            email={email}
            userId={userId}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Help;
