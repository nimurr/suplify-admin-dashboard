import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialData = [
  {
    key: '1',
    id: '01',
    name: 'Sakib Ahmed',
    email: 'sakibahmed@gmail.com',
    role: 'Doctor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    key: '2',
    id: '02',
    name: 'Fuad Ahmed',
    email: 'fuad@gmail.com',
    role: 'Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    key: '3',
    id: '03',
    name: 'Mahmud',
    email: 'mahmud.uiuxdesign@gmail.com',
    role: 'Member',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    key: '4',
    id: '04',
    name: 'Sakib Ahmed',
    email: 'sakibahmed@gmail.com',
    role: 'Doctor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

const UserManagement = () => {
  const [data] = useState(initialData);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
  });

  const [sortedInfo, setSortedInfo] = useState({
    columnKey: 'role',
    order: 'ascend',
  });

  const handleChange = (e, columnKey) => {
    const newOrder = sortedInfo.order === 'ascend' ? 'descend' : 'ascend';
    setSortedInfo({
      columnKey,
      order: newOrder,
    });
  };

  const columns = [
    { title: 'Id', key: 'id' },
    { title: 'User Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Role', key: 'role' },
    { title: 'Action', key: 'action' },
  ];

  // Handle Pagination
  const currentData = data.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  // Sorting
  const sortedData = currentData.sort((a, b) => {
    if (sortedInfo.order === 'ascend') {
      return a[sortedInfo.columnKey] > b[sortedInfo.columnKey] ? 1 : -1;
    }
    return a[sortedInfo.columnKey] < b[sortedInfo.columnKey] ? 1 : -1;
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">User Management</h1>
      <table border="1" className="w-full table-auto border-collapse rounded-lg overflow-hidden">
        <thead className='bg-[#d80000] text-primaryBg'>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left"
                onClick={(e) => handleChange(e, col.key)}
                style={{ cursor: 'pointer' }}
              >
                {col.title}
                {col.key === sortedInfo.columnKey && (
                  <span>{sortedInfo.order === 'ascend' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record) => (
            <tr key={record.key}>
              <td className="px-4 py-2">{record.id}</td>
              <td className="px-4 py-2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={record.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  {record.name}
                </div>
              </td>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2">{record.role}</td>
              <td className="px-4 py-2">
                <Link to={`view-user/${record.id}`} className="text-blue-500">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => setPagination((prev) => ({ ...prev, current: prev.current - 1 }))}
          disabled={pagination.current === 1}
          className="px-4 py-2 bg-[#d80000] text-primaryBg rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className='font-semibold'>
          Page {pagination.current} of {Math.ceil(data.length / pagination.pageSize)}
        </span>
        <button
          onClick={() => setPagination((prev) => ({ ...prev, current: prev.current + 1 }))}
          disabled={pagination.current === Math.ceil(data.length / pagination.pageSize)}
          className="px-4 py-2 bg-[#d80000] text-primaryBg rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
