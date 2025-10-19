import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../../../redux/features/users/users';

const UserManagement = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const fullData = users?.data?.attributes || [];
  console.log(fullData?.results);

  const [data, setData] = useState(fullData?.results);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  const [search, setSearch] = useState(""); // State for search input

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, [data]);

  // Handle Sorting
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
    { title: 'approvalStatus', key: 'approvalStatus' },
    { title: 'Email', key: 'email' },
    { title: 'subscription Type', key: 'subscriptionType' },
    { title: 'Action', key: 'action' },
  ];

  // Handle Pagination
  const currentData = data?.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  // Sorting Logic
  const sortedData = currentData?.sort((a, b) => {
    if (sortedInfo.order === 'ascend') {
      return a[sortedInfo.columnKey] > b[sortedInfo.columnKey] ? 1 : -1;
    }
    return a[sortedInfo.columnKey] < b[sortedInfo.columnKey] ? 1 : -1;
  });

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Filter data based on the search term
    const filteredData = fullData?.results.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData); // Set the filtered data in the state
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <div
          className={`md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center`}
        >
          <div>
            <p className="text-lg text-gray-500 font-medium mb-2"> Total Users </p>
            <p className="text-4xl text-gray-500 font-medium">
              {fullData?.statistics?.totalUser}
            </p>
          </div>
        </div>

        <div
          className={`md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center`}
        >
          <div>
            <p className="text-lg text-gray-500 font-medium mb-2"> Total Doctors </p>
            <p className="text-4xl text-gray-500 font-medium">
              {fullData?.statistics?.totalDoctor}
            </p>
          </div>
        </div>
        <div
          className={`md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center`}
        >
          <div>
            <p className="text-lg text-gray-500 font-medium mb-2"> Total Patients </p>
            <p className="text-4xl text-gray-500 font-medium">
              {fullData?.statistics?.totalPatient}
            </p>
          </div>
        </div>
        <div
          className={`md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center`}
        >
          <div>
            <p className="text-lg text-gray-500 font-medium mb-2"> Total Specialists </p>
            <p className="text-4xl text-gray-500 font-medium">
              {fullData?.statistics?.totalSpecialist}
            </p>
          </div>
        </div>
      </div>

      <div className="my-5 flex items-center gap-2 justify-between flex-wrap">
        <h1 className="text-xl font-semibold">User Management</h1>
        <input
          type="text"
          placeholder="Search Here.."
          className="px-4 min-w-[250px] py-2 rounded-lg border border-[#eee] focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search} // Bind the search value
          onChange={handleSearch} // Trigger search on change
        />
      </div>

      <table border="1" className="w-full table-auto border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
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
          {sortedData?.map((record, index) => (
            <tr key={record.key}>
              <td className="px-4 py-2">{++index}</td>
              <td className="px-4 py-2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={record.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {record.name}
                </div>
              </td>
              <td
                className={`px-4 py-2 capitalize ${record.approvalStatus === 'approved' && 'text-[green]'
                  } ${record.approvalStatus === 'pending' && 'text-[orange]'}`}
              >
                {record.approvalStatus}
              </td>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2">{record.subscriptionType}</td>
              <td className="px-4 py-2">
                <Link to={`view-user/${record.id}`} className="text-blue-500">
                  View
                </Link>
              </td>
            </tr>
          ))}
          {isLoading && (
            <tr>
              <td colSpan={7} className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() =>
            setPagination((prev) => ({ ...prev, current: prev.current - 1 }))
          }
          disabled={pagination.current === 1}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {pagination.current} of {Math.ceil(data?.length / pagination.pageSize)}
        </span>
        <button
          onClick={() =>
            setPagination((prev) => ({ ...prev, current: prev.current + 1 }))
          }
          disabled={pagination.current === Math.ceil(data?.length / pagination.pageSize)}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;