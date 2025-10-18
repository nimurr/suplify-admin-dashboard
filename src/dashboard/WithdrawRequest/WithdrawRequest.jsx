import React, { useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useGetAllWithdrawRequestQuery, useProofOfpaymentMutation } from '../../redux/features/withdrawRequest/withdrawRequest';
import toast, { Toaster } from 'react-hot-toast';
import url from '../../redux/api/baseUrl';

const WithdrawRequest = () => {


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

    const [selectedSpecialist, setSelectedSpecialist] = useState(null);



    const [paymentProof, { isLoading }] = useProofOfpaymentMutation();


    const handleSumitPay = async (e) => {
        e.preventDefault();

        // Access the file input using the 'files' property
        const image = e.target.image.files[0]; // Grabbing the first selected file
        const formData = new FormData();

        if (image) {
            formData.append('proofOfPayment', image);
        }
        else {
            return toast.error('Please select an image');
        }

        try {

            const res = await paymentProof({ data: formData, id: selectedSpecialist?._WithdrawalRequstId }).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong');
        }

    };
    return (
        <div>
            <Toaster />
            <h1 className="text-xl font-semibold mb-6">Withdraw Request</h1>

            <div className="space-y-5">
                {/* Specialist List */}
                <div className="overflow-x-auto bg-white  border border-[#dfdfdf] rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
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
                                <tr onClick={() => setSelectedSpecialist(specialist)} key={index} className="border-t cursor-pointer border-b border-[#dfdfdf] hover:bg-gray-100">
                                    <td className="py-5 px-4 text-gray-700 text-sm flex gap-2 items-center">
                                        <img className='w-14 h-14 rounded-full' src={url + specialist?.userId?.profileImage?.imageUrl} alt="" />
                                        <div>
                                            <p className='font-semibold'>{specialist?.userId?.name}</p>
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
                    <h2 className='font-semibold text-center py-5'>{
                        !fullData && "Not Available !!"
                    }</h2>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-end items-center gap-3 mt-6">
                    <button
                        onClick={handlePrevPage}
                        className="py-2 px-4 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded hover:bg-gray-400 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="text-sm font-semibold">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        onClick={handleNextPage}
                        className="py-2 px-4 bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg rounded hover:bg-gray-400 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                {/* Payment Summary Section */}
                {
                    selectedSpecialist &&
                    <div className='flex items-center justify-end capitalize'>
                        <div className="bg-[#eef7ff] border border-[#dfdfdf] max-w-[500px] w-full  rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                            <div className="text-sm space-y-2 mb-2">
                                <p>Total balance of specialist: <span className="font-semibold">${selectedSpecialist?.walletId?.amount || 0}</span></p>
                                <p>Requested amount: <span className="font-semibold">${selectedSpecialist?.requestedAmount || 0}</span></p>
                                {
                                    selectedSpecialist?.status &&
                                    <p>Status: <span className="font-semibold text-[#01d313]">{selectedSpecialist?.status}</span></p>
                                }
                            </div>

                            {/* Upload receipt */}
                            <form onSubmit={handleSumitPay} className="my-6">
                                {
                                    selectedSpecialist?.proofOfPayment[0] ?
                                        <img src={selectedSpecialist?.proofOfPayment[0]?.attachment} alt="" />
                                        :
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Upload receipt</label>
                                            <input
                                                type="file"
                                                name="image" // Make sure to add the name attribute here
                                                className="w-full text-sm text-gray-600 file:border file:border-gray-300 file:py-2 file:px-4 file:rounded-lg file:text-sm file:bg-gray-50"
                                            />
                                        </div>
                                }
                                <button disabled={selectedSpecialist?.proofOfPayment[0]} className="w-full bg-[#d30101] text-primaryBg py-2 mt-3 rounded-lg disabled:opacity-50">
                                    Pay Now
                                </button>
                            </form>

                            {/* Pay Now Button */}
                        </div>
                    </div>
                }

            </div>


        </div>
    );
};

export default WithdrawRequest;
