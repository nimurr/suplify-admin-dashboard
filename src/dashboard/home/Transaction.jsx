import React, { useState } from 'react';
import users from '../../../public/image/randomuser.jpg';
import './transaction.css';
import { BsInfoCircle } from 'react-icons/bs';
import { Modal } from 'antd'; // Import the Modal component from Ant Design
import { useGetAllTransactionsQuery } from '../../redux/features/withdrawRequest/withdrawRequest';

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected transaction
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(5); // Number of items per page (you can change this value)

  // Fetch data from the API
  const { data } = useGetAllTransactionsQuery();
  const fullData = data?.data?.attributes?.results || [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = fullData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(fullData.length / itemsPerPage);

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="py-4">
      <h1 className="text-header text-2xl font-medium my-2">Recent Transaction</h1>
      <table className="min-w-full table-auto border-collapse border rounded-lg overflow-hidden border-[#eee]">
        <thead>
          <tr className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
            <th className="py-4 px-4 border-b border-[#eee] text-left">#Transaction ID</th>
            <th className="py-4 px-4 border-b border-[#eee] text-left">Amount</th>
            <th className="py-4 px-4 border-b border-[#eee] text-left">Currency</th>
            <th className="py-4 px-4 border-b border-[#eee] text-left">Payment Gateway</th>
            <th className="py-4 px-4 border-b border-[#eee] text-left">Payment Status</th>
            <th className="py-4 px-4 border-b border-[#eee] text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((record) => (
            <tr key={record._paymentTransactionId}>
              <td className="py-3 px-4 border-b border-[#eee]">{record._paymentTransactionId}</td>
              <td className="py-3 px-4 border-b border-[#eee]">{record.amount}</td>
              <td className="py-3 px-4 border-b border-[#eee]">{record.currency}</td>
              <td className="py-3 px-4 border-b border-[#eee]">{record.paymentGateway}</td>
              <td className="py-3 px-4 border-b border-[#eee]">{record.paymentStatus}</td>
              <td className="py-3 px-4 border-b border-[#eee] text-center">
                <BsInfoCircle
                  onClick={() => handleView(record)}
                  size={18}
                  className="text-red-500 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2  bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="text-lg font-semibold mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2  bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title="Transaction Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedTransaction && (
          <div className="p-[20px]">
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>Amount:</p>
              <p>{selectedTransaction.amount}</p>
            </div>
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>Currency:</p>
              <p>{selectedTransaction.currency}</p>
            </div>
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>Payment Gateway:</p>
              <p>{selectedTransaction.paymentGateway}</p>
            </div>
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>Payment Status:</p>
              <p>{selectedTransaction.paymentStatus}</p>
            </div>
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>Reference For:</p>
              <p>{selectedTransaction.referenceFor}</p>
            </div>
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>Reference ID:</p>
              <p>{selectedTransaction.referenceId}</p>
            </div>
            <div className="flex justify-between border-b border-[#eee] py-[16px]">
              <p>User ID:</p>
              <p>{selectedTransaction.userId}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Transaction;