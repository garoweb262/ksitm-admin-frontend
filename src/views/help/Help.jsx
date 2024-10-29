import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../../components/table/ReusableTable';
import TableOption from '../../components/table/TableOption';
import Button from '../../components/button/Button';
import FilterSearch from '../../components/filter/FilterSearch';
import FormatDate from '../../components/table/FormatDate';
import Loader from '../../components/loader/Loader';
import EmptyTable from '../../components/table/EmptyTable';
import Modal from '../../components/modal/Modal';
import { getAllComplains } from '../../api/complain';
import { useAuth } from '../../context/AuthContext';
import { getAllApplicants } from '../../api/applicantsApi';
import Reply from './forms/Reply';

const Help = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const { token } = state;
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);

  const openModal = (id, userId, fullname, email) => {
    setIsOpen(true);
    setId(id), setUserId(userId);
    setFullname(fullname);
    setEmail(email);
  };

  const closeModal = () => {
    setIsOpen(false);
    setId(null), setUserId(null);
    setFullname(null);
    setEmail(null);
  };

  const helpsQuery = useQuery({
    queryKey: ['helps', pageIndex, pageSize],
    queryFn: () => getAllComplains(pageIndex + 1, pageSize),
    onSuccess: (data) => {
      console.log(data);
      setTotalPages(data.totalPages);
    },
    onError: (error) => {
      console.error('Error fetching complaints:', error);
    },
  });

  const usersQuery = useQuery({
    queryKey: ['users', pageIndex, pageSize],
    queryFn: () => getAllApplicants(token, pageIndex + 1, pageSize),
    onSuccess: (data) => {
      console.log(data); // Log data to see the structure and ensure it has the expected format
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    },
  });

  // Create a mapping of userId to user data
  const userMap = useMemo(() => {
    if (!usersQuery.data || !usersQuery.data.data) return {};
    return usersQuery.data.data.reduce((acc, user) => {
      acc[user.userId] = user; // Assuming userId is unique in your user data
      return acc;
    }, {});
  }, [usersQuery.data]);

  const combinedData = useMemo(() => {
    if (!helpsQuery.data) return [];
    return helpsQuery.data.data.map((complaint) => {
      const user = userMap[complaint.userId] || {};
      return {
        ...complaint,
        fullname:
          user.firstName +
          (user.middleName ? ' ' + user.middleName : '') +
          ' ' +
          (user.surName ? user.surName : 'not registered'),

        email: user.email || 'not registered',
      };
    });
  }, [helpsQuery.data, userMap]);

  const columns = useMemo(
    () => [
      { Header: 'Sn', accessor: (row, i) => i + 1 },
      {
        Header: 'User ID',
        accessor: 'userId',
        Cell: ({ value }) => (
          <div className="w-40">
            {value !== null ? value : 'not registered'}
          </div>
        ),
      },
      {
        Header: 'Full Name',
        accessor: 'fullname', // Use the fullname from combined data
      },
      {
        Header: 'Email Address',
        accessor: 'email', // Use the email from combined data
      },
      {
        Header: 'Complain',
        accessor: 'complain',
        Cell: ({ value }) => <div className="w-60">{value}</div>,
      },
      {
        Header: 'Reply',
        accessor: 'reply',
        Cell: ({ value }) => (
          <div className="w-40 capitalize">
            {value === null ? 'not replied' : value}
          </div>
        ),
      },
      {
        Header: 'Reply Sent',
        accessor: 'isReply',
        Cell: ({ value }) => (
          <div className="w-40 capitalize">
            {value === true ? 'replied' : 'not replied'}
          </div>
        ),
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
                <button
                  onClick={() =>
                    openModal(
                      row.original._id,
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
      </div>

      {helpsQuery.isLoading ? (
        <Loader loading={helpsQuery.isLoading} />
      ) : combinedData.length === 0 ? (
        <EmptyTable columns={columns} message="No complain records found." />
      ) : (
        <ReusableTable
          columns={columns}
          data={combinedData}
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
            id={id}
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
