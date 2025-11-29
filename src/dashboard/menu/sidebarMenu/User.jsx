import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../../../redux/features/users/users';
import url from '../../../redux/api/baseUrl';

const UserManagement = () => {
  const [status, setStatus] = useState('');  // State for filtering by status
  const [subStatus, setSubStatus] = useState('');  // State for filtering by status
  const [role, setRoleStatus] = useState('');  // State for filtering by status

  const { data: users, isLoading } = useGetAllUsersQuery({ status, subStatus, role });
  const fullData = users?.data?.attributes || [];
  console.log(fullData);

  const [data, setData] = useState(fullData?.results);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  const [search, setSearch] = useState(""); // State for search input

  // Set the data initially only once when the component mounts
  useEffect(() => {
    if (fullData?.results) {
      setData(fullData?.results);
    }
  }, [fullData]); // This will run once when `fullData` changes (like when first loaded)

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
    { title: 'role', key: 'role' },
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

  // Handle Pagination Controls
  const handlePagination = (direction) => {
    setPagination((prev) => ({
      ...prev,
      current: direction === 'next' ? prev.current + 1 : prev.current - 1,
    }));
  };

  // Handle Status Filtering
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);  // Update the status filter state
  };
  const handleSubStautsChange = (e) => {
    const selectSubStatus = e.target.value;
    setSubStatus(selectSubStatus);  // Update the status filter state
  };
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRoleStatus(selectedRole);  // Update the status filter state
  };

  return (
    <div>
      {
        isLoading ? <div className='grid xl:grid-cols-4 lg:grid-cols-2 gap-3 grid-cols-1'>
          {
            [...Array(4)].map((_, index) => (
              <div className="mx-auto w-full max-w-sm rounded-md border border-[#8400ff2a] p-4" key={index}>
                <div className="flex animate-pulse space-x-4">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                        <div className="col-span-1 h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                      </div>
                      <div className="h-2 rounded bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div> : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
            {/* Dashboard Stats */}
            <div className="md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-500 font-medium mb-2"> Total Users </p>
                <p className="text-4xl text-gray-500 font-medium">
                  {fullData?.statistics?.totalUser}
                </p>
              </div>
            </div>

            <div className="md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-500 font-medium mb-2"> Total Doctors </p>
                <p className="text-4xl text-gray-500 font-medium">
                  {fullData?.statistics?.totalDoctor}
                </p>
              </div>
            </div>

            <div className="md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-500 font-medium mb-2"> Total Patients </p>
                <p className="text-4xl text-gray-500 font-medium">
                  {fullData?.statistics?.totalPatient}
                </p>
              </div>
            </div>

            <div className="md:py-10 p-5 font-[arial] rounded-lg bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg flex justify-between items-center">
              <div>
                <p className="text-lg text-gray-500 font-medium mb-2"> Total Specialists </p>
                <p className="text-4xl text-gray-500 font-medium">
                  {fullData?.statistics?.totalSpecialist}
                </p>
              </div>
            </div>
          </div>
        )
      }

      {/* Search Bar */}
      <div className="my-5 flex items-center gap-2 justify-between flex-wrap ">
        <h1 className="text-xl font-semibold">User Management</h1>
        <div className='flex items-center gap-2'>
          {/*patient-admin-specialist-doctor*/}
          <select
            onChange={handleRoleChange}
            value={role}
            className="px-4 py-2 rounded-lg border border-[#eee] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Role</option>
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
            <option value="specialist">Specialist</option>
            <option value="doctor">Doctor</option>
          </select>

          <select
            onChange={handleSubStautsChange}
            value={subStatus}
            className="px-4 py-2 rounded-lg border border-[#eee] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sub</option>
            <option value="none">None</option>
            <option value="freeTrial">Free Trial</option>
            <option value="standard">Standard</option>
            <option value="standardPlus">Standard Plus</option>
            <option value="vise">Vise</option>
          </select>

          <select
            onChange={handleStatusChange}
            value={status}
            className="px-4 py-2 rounded-lg border border-[#eee] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Here.."
            className="px-4 min-w-[250px] py-2 rounded-lg border border-[#eee] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search} // Bind the search value
            onChange={handleSearch} // Trigger search on change
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table border="1" className="w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left capitalize font-semibold"
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

          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            <tbody>
              {sortedData?.map((record, index) => (
                <tr key={record.key}>
                  <td className="px-4 py-2">{++index}</td>
                  <td className="px-4 py-2">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={record.profileImage?.imageUrl.includes('amazonaws') ? record.profileImage?.imageUrl : url + record.profileImage?.imageUrl}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {record.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 capitalize">{record.role}</td>
                  <td
                    className={`px-4 py-2 capitalize ${record.approvalStatus === 'approved' && 'text-[green]'} ${record.approvalStatus === 'pending' && 'text-[orange]'}`}
                  >
                    {record.approvalStatus}
                  </td>
                  <td className="px-4 py-2">{record.email}</td>
                  <td className="px-4 py-2">{record.subscriptionType}</td>
                  <td className="px-4 py-2">
                    <Link to={`${record?.role === 'patient' ? 'specialist' : 'view-user'}/${record._id}`} className="text-blue-500">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => handlePagination('prev')}
          disabled={pagination.current === 1}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {pagination.current} of {Math.ceil(data?.length / pagination.pageSize)}
        </span>
        <button
          onClick={() => handlePagination('next')}
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