import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import toast from 'react-hot-toast';

const demoResults = [
    {
        patientId: {
            name: 'odvut 4 patient',
            email: 'odvut4@yopmail.com',
            profileImage: {
                imageUrl: '/uploads/users/user.png',
            },
            subscriptionType: 'standard',
        },
        status: 'pending',
        createdAt: '2026-01-27T11:36:59.051Z',
        _RequestForViseSubscriptionToAdminId: '6978a35b388c765109d02065',
    },
    // you can duplicate this object to test pagination
];

const ViseSubRequest = () => {
    const [results, setResults] = useState(demoResults);
    const [page, setPage] = useState(1);
    const limit = 5;

    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / limit);

    const paginatedResults = results.slice(
        (page - 1) * limit,
        page * limit
    );

    const handleAccept = (id) => {
        setResults(prev =>
            prev.map(item =>
                item._RequestForViseSubscriptionToAdminId === id
                    ? { ...item, status: 'approved' }
                    : item
            )
        );
        toast.success('Subscription Approved');
    };

    const handleDecline = (id) => {
        setResults(prev =>
            prev.map(item =>
                item._RequestForViseSubscriptionToAdminId === id
                    ? { ...item, status: 'rejected' }
                    : item
            )
        );
        toast.success('Subscription Rejected');
    };

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
                Vise Subscription Requests
            </h3>

            {/* Table */}
            <div className="overflow-x-auto border border-[#eee] rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gradient-to-br from-[#8400ff8e] to-[#ff09099f] text-primaryBg">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Patient
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Subscription
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Date
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">
                                Status
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedResults.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No requests found
                                </td>
                            </tr>
                        )}

                        {paginatedResults.map(item => (
                            <tr
                                key={item._RequestForViseSubscriptionToAdminId}
                                className="border-t hover:bg-gray-50"
                            >
                                {/* Patient */}
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <img
                                        src={item.patientId.profileImage.imageUrl}
                                        alt=""
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {item.patientId.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.patientId.email}
                                        </p>
                                    </div>
                                </td>

                                {/* Subscription */}
                                <td className="px-4 py-3 capitalize">
                                    {item.patientId.subscriptionType}
                                </td>

                                {/* Date */}
                                <td className="px-4 py-3">
                                    {moment(item.createdAt).format('lll')}
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full capitalize text-xs font-semibold
                                            ${
                                                item.status === 'approved'
                                                    ? 'bg-green-100 text-[green]'
                                                    : item.status === 'rejected'
                                                    ? 'bg-red-100 text-[red]'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            title="Accept"
                                            className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                                            disabled={item.status !== 'pending'}
                                            onClick={() =>
                                                handleAccept(
                                                    item._RequestForViseSubscriptionToAdminId
                                                )
                                            }
                                        >
                                            <CheckOutlined />
                                        </button>

                                        <button
                                            title="Reject"
                                            className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                                            disabled={item.status !== 'pending'}
                                            onClick={() =>
                                                handleDecline(
                                                    item._RequestForViseSubscriptionToAdminId
                                                )
                                            }
                                        >
                                            <CloseOutlined />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="text-sm text-gray-600">
                        Page {page} of {totalPages} • {totalResults} results
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className={`px-4 py-2 border rounded
                                ${
                                    page === 1
                                        ? 'bg-gray-100 text-[gray] cursor-not-allowed'
                                        : 'hover:bg-gray-100'
                                }
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
                                        ${
                                            page === pageNumber
                                                ? 'bg-gradient-to-br from-[#8400ffe5] to-[#ff0909d3] text-primaryBg'
                                                : 'hover:bg-gray-100'
                                        }
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
                                ${
                                    page === totalPages
                                        ? 'bg-gray-100 text-[gray] cursor-not-allowed'
                                        : 'hover:bg-gray-100'
                                }
                            `}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViseSubRequest;
