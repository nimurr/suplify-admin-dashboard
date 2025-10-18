import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    pageSize: 5,
  });

  // Pagination logic: slice the data to show only the items for the current page
  const currentData = dataSource.slice(
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
            <th className="px-4 text-left py-2">Id</th>
            <th className="px-4 text-left py-2">Category</th>
            <th className="px-4 text-left py-2">Item</th>
            <th className="px-4 text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((record) => (
            <tr className='border-b border-[#ccc]' key={record.key}>
              <td className="px-4 py-2">{record.id}</td>
              <td className="px-4 py-2"><strong>{record.category}</strong></td>
              <td className="px-4 py-2">{record.item}</td>
              <td className="px-4 py-2">
                <Link to="view-store" className="text-blue-500">View</Link>
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
