import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetAllOrderQuery } from '../../redux/features/Order/order';

const Order = () => {

    const { data } = useGetAllOrderQuery();
    const fullData = data?.data?.attributes?.results;
    console.log(fullData);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page

    // Calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = fullData?.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages calculation
    const totalPages = Math.ceil(fullData?.length / itemsPerPage);

    // Handlers for pagination buttons
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div >
            <div className="overflow-x-auto">
                <h1 className="font-semibold text-[20px] mb-5">All Orders</h1>
                <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-[#c50808] text-primaryBg">
                        <tr>
                            <th className="py-3 px-4 text-sm font-semibold">#Order id</th>
                            <th className="py-3 px-4 text-sm font-semibold">Payment Status</th>
                            <th className="py-3 px-4 text-sm font-semibold">User Name</th>
                            <th className="py-3 px-4 text-sm font-semibold">Transaction Id</th>
                            <th className="py-3 px-4 text-sm font-semibold">Payment Method</th>
                            <th className="py-3 px-4 text-sm font-semibold">Total Amount</th>
                            <th className="py-3 px-4 text-sm font-semibold">Status</th>
                            <th className="py-3 px-4 text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentOrders?.map((order, index) => (
                            <tr key={index} className="border-b border-[#ececec] hover:bg-[#fff4f4]">
                                <td className="py-3 px-4 text-gray-700 text-sm">{order._orderId || 'N/A'}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{order.paymentStatus}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{order.userId?.name}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{order.paymentTransactionId}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{order.paymentMethod}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{order.finalAmount}$</td>
                                <td className="py-3 px-4 text-sm font-medium">
                                    <span
                                        className={
                                            order.status === 'Delivered'
                                                ? 'text-green-600'
                                                : 'text-orange-500'
                                        }
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <Link to={`/dashboard/order/${order._orderId}`} className="py-3 flex items-center px-4 text-center">
                                    <IoEyeOutline className="w-5 h-5 text-black cursor-pointer inline" />
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-3 mt-4">
                <button
                    onClick={handlePrevPage}
                    className="py-2 px-4 bg-[#c50808] text-primaryBg rounded hover:bg-gray-400 disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div className="text-sm font-semibold">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={handleNextPage}
                    className="py-2 px-4 bg-[#c50808] text-primaryBg rounded hover:bg-gray-400 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Order;