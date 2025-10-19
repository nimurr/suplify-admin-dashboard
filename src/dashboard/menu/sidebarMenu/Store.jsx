import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetStoreItemsQuery } from '../../../redux/features/Store/Store';

const dataSource = [
  {
    key: '1',
    id: '01',
    category: 'Supplements',
    item: 10,
  },
  {
    key: '2',
    id: '02',
    category: 'Fitness',
    item: 25,
  },
  {
    key: '3',
    id: '03',
    category: 'Wellness',
    item: 24,
  },
  {
    key: '4',
    id: '04',
    category: 'Lifestyle',
    item: 60,
  },
  {
    key: '5',
    id: '05',
    category: 'Lab test',
    item: 60,
  },
  {
    key: '6',
    id: '06',
    category: 'Healthcare',
    item: 40,
  },
  {
    key: '7',
    id: '07',
    category: 'Beauty',
    item: 15,
  },
];

const StoreTable = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data } = useGetStoreItemsQuery();
  const storeData = data?.data?.attributes?.counts || [];

  // Pagination logic: slice the data to show only the items for the current page
  const currentData = storeData?.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  // Handle pagination change
  const handlePaginationChange = (direction) => {
    setPagination((prev) => {
      const newPage = direction === 'next' ? prev.current + 1 : prev.current - 1;
      return {
        ...prev,
        current: newPage,
      };
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Store Management</h1>

      {/* Raw HTML Table */}
      <table border="1" className="w-full table-auto border-collapse rounded-lg overflow-hidden">
        <thead className='bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg'>
          <tr>
            <th className="px-4 text-center py-5">SL</th>
            <th className="px-4 text-center py-5">Category</th>
            <th className="px-4 text-center py-5">Item</th>
            <th className="px-4 text-center py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((record, idx) => (
            <tr className='border-b border-[#ccc]' key={record.key}>
              <td className="px-4 text-center py-5">{++idx}</td>
              <td className="px-4 capitalize text-center py-5"><strong>{record._id}</strong></td>
              <td className="px-4 text-center py-5">{record.count}</td>
              <td className="px-4 text-center py-5">
                <Link to={`view-store?id=${record._id}`} className="text-blue-500 text-center flex items-center justify-center gap-1">
                  <IoEyeOutline className='text-2xl ' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => handlePaginationChange('prev')}
          disabled={pagination.current === 1}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className='font-semibold'>
          Page {pagination.current} of {Math.ceil(dataSource.length / pagination.pageSize)}
        </span>
        <button
          onClick={() => handlePaginationChange('next')}
          disabled={pagination.current === Math.ceil(dataSource.length / pagination.pageSize)}
          className="px-4 py-2 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoreTable;
