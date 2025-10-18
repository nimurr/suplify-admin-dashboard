import React, { useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useGetAllWithdrawRequestQuery } from '../../redux/features/withdrawRequest/withdrawRequest';

const WithdrawRequest = () => {
    const specialists = [
        { id: 1, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Specialist', bankName: 'City Bank', branchName: 'Branch Name' },
        { id: 2, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Doctor', bankName: 'City Bank', branchName: 'Branch Name' },
        { id: 3, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Specialist', bankName: 'City Bank', branchName: 'Branch Name' },
        { id: 4, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Specialist', bankName: 'City Bank', branchName: 'Branch Name' },
        { id: 5, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Specialist', bankName: 'City Bank', branchName: 'Branch Name' },
        { id: 6, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Specialist', bankName: 'City Bank', branchName: 'Branch Name' },
        { id: 7, name: 'Maria Rodriguez', email: 'Abc@gmail.com', accountType: 'Specialist', bankName: 'City Bank', branchName: 'Branch Name' },
    ];

    const { data } = useGetAllWithdrawRequestQuery();
    const fullData = data?.data?.attributes?.results;
    console.log(fullData);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page

    // Calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpecialists = fullData?.slice(indexOfFirstItem, indexOfLastItem);

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
        <div>
            <h1 className="text-xl font-semibold mb-6">Withdraw Request</h1>

            <div className="space-y-5">
                {/* Specialist List */}
                <div className="overflow-x-auto bg-white  border border-[#dfdfdf] rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-[#d40000] text-primaryBg">
                            <tr>
                                <th className="py-3 px-4 text-sm text-left font-semibold">Specialist Name</th>
                                <th className="py-3 px-4 text-sm text-left font-semibold">Account bankAccountNumber</th>
                                <th className="py-3 px-4 text-sm text-left font-semibold">Account Holder Name</th>
                                <th className="py-3 px-4 text-sm text-left font-semibold">Bank Name</th>
                                <th className="py-3 px-4 text-sm text-left font-semibold">Branch Name</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentSpecialists?.map((specialist, index) => (
                                <tr key={index} className="border-t cursor-pointer border-b border-[#dfdfdf] hover:bg-gray-100">
                                    <td className="py-5 px-4 text-gray-700 text-sm flex items-center">
                                        <img className='w-16 h-16 rounded-full' src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" alt="" />
                                        <div>
                                            <p className='font-semibold'>{specialist.bankAccountHolderName}</p>
                                            <span>{specialist.bankAccountType}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4 text-gray-700 text-sm">{specialist.bankAccountNumber}</td>
                                    <td className="py-5 px-4 text-gray-700 text-sm">{specialist.bankAccountHolderName}</td>
                                    <td className="py-5 px-4 text-gray-700 text-sm">{specialist.bankName}</td>
                                    <td className="py-5 px-4 text-gray-700 text-sm">{specialist.bankBranch}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-end items-center gap-3 mt-6">
                    <button
                        onClick={handlePrevPage}
                        className="py-2 px-4 bg-[#d30101] text-primaryBg rounded hover:bg-gray-400 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="text-sm font-semibold">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        onClick={handleNextPage}
                        className="py-2 px-4 bg-[#d30101] text-primaryBg rounded hover:bg-gray-400 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                {/* Payment Summary Section */}
                <div className='flex items-center justify-end'>
                    <div className="bg-[#eef7ff] border border-[#dfdfdf] max-w-[500px] w-full  rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                        <div className="text-sm space-y-2 mb-2">
                            <p>Total balance of specialist: <span className="font-semibold">$500</span></p>
                            <p>Requested amount: <span className="font-semibold">$300</span></p>
                        </div>

                        {/* Upload receipt */}
                        <div className="my-6">
                            <label className="block text-sm font-semibold mb-2">Upload receipt</label>
                            <input
                                type="file"
                                className="w-full text-sm text-gray-600 file:border file:border-gray-300 file:py-2 file:px-4 file:rounded-lg file:text-sm file:bg-gray-50"
                            />
                        </div>

                        {/* Pay Now Button */}
                        <button className="w-full bg-[#d30101] text-primaryBg py-2 rounded-lg">Pay Now</button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default WithdrawRequest;
