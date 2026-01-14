import React, { useState } from 'react';
import {
    useGetAllHireSpecialistRequestsQuery,
} from '../../redux/features/HireSpecialistRequests/HireSpecialistRequests';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import url from '../../redux/api/baseUrl';

const HireSpecialistRequests = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const { data, isLoading } = useGetAllHireSpecialistRequestsQuery({ page, limit });

    const totalPages = data?.data?.attributes?.totalPages || 1;
    const totalResults = data?.data?.attributes?.totalResults || 0;
    const results = data?.data?.attributes?.results || [];
    console.log(results)

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Hire Specialist Requests</h3>

            {/* Table */}
            <div className="overflow-x-auto border border-[#eee] rounded-lg">
                <table className="min-w-full  ">
                    <thead className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Patient</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Specialist</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {results.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500">
                                    No requests found
                                </td>
                            </tr>
                        )}

                        {results.map((item) => (
                            <tr
                                key={item._HireSpecialistRequestToAdminId}
                                className="border-t hover:bg-gray-50"
                            >
                                {/* Patient */}
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <img className='w-12 rounded-full h-12' src={item.patientId?.profileImage?.profileImage?.includes('amazonaws') ? item.patientId?.profileImage?.imageUrl : url + item.patientId?.profileImage?.imageUrl} alt="" />
                                    <div>
                                        <p className="font-medium">{item.patientId?.name}</p>
                                        <p className="text-sm text-gray-500">{item.patientId?.email}</p>
                                    </div>
                                </td>

                                {/* Specialist */}
                                <td className="px-4 py-3">
                                    <div className='flex gap-2'>
                                        <img className='w-12 rounded-full h-12' src={item.specialistId?.profileImage?.profileImage?.includes('amazonaws') ? item.specialistId?.profileImage?.imageUrl : url + item.specialistId?.profileImage?.imageUrl} alt="" />
                                        <div>
                                            <p className="font-medium">{item.specialistId?.name}</p>
                                            <p className="text-sm text-gray-500">{item.specialistId?.email}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${item.status === 'approved'
                                                ? 'bg-green-100 text-green-700'
                                                : item.status === 'rejected'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        {/* Accept */}
                                        <button
                                            title="Accept"
                                            className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                                            onClick={() =>
                                                console.log('ACCEPT', item._HireSpecialistRequestToAdminId)
                                            }
                                        >
                                            <CheckOutlined />
                                        </button>

                                        {/* Reject */}
                                        <button
                                            title="Reject"
                                            className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                                            onClick={() =>
                                                console.log('REJECT', item._HireSpecialistRequestToAdminId)
                                            }
                                        >
                                            <CloseOutlined />
                                        </button>

                                        {/* Remove */}
                                        <button
                                            title="Remove"
                                            className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                                            onClick={() =>
                                                console.log('DELETE', item._HireSpecialistRequestToAdminId)
                                            }
                                        >
                                            <DeleteOutlined />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-gray-600">
                    Page {page} of {totalPages} • {totalResults} results
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 border rounded
                            ${page === 1
                                ? 'bg-gray-100 text-[gray] cursor-not-allowed'
                                : 'hover:bg-gray-100'}
                        `}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`px-4 py-2 border rounded
                                    ${page === pageNumber
                                        ? 'bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg'
                                        : 'hover:bg-gray-100'}
                                `}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className={`px-4 py-2 border rounded
                            ${page === totalPages
                                ? 'bg-gray-100 text-[gray] cursor-not-allowed'
                                : 'hover:bg-gray-100'}
                        `}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HireSpecialistRequests;
