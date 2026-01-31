import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import toast from 'react-hot-toast';
import url from '../../redux/api/baseUrl';
import {
    useAcceptAndRejectViseMutation,
    useCancelViseRequestMutation,
    useViseSubRequestQuery,
} from '../../redux/features/subscription/subscription';

const ViseSubRequest = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [status, setStatus] = useState('');

    // Fetch data
    const { data, isLoading, refetch } = useViseSubRequestQuery({ page, limit, status });

    const [updateStatus] = useAcceptAndRejectViseMutation();
    const [cancelViseRequest] = useCancelViseRequestMutation();

    // Extract backend pagination data
    const attributes = data?.data?.attributes;
    const allViseSubRequest = attributes?.results || [];
    const totalPages = Number(attributes?.totalPages || 1);
    const totalResults = Number(attributes?.totalResults || 0);

    // Accept handler
    const handleAccept = async (id) => {
        try {
            const res = await updateStatus({
                id,
                data: { status: 'approved' },
            }).unwrap();

            if (res?.code === 200) {
                toast.success(res?.message || 'Subscription Approved');
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    // Reject handler
    const handleDecline = async (id) => {
        try {
            const res = await updateStatus({
                id,
                data: { status: 'rejected' },
            }).unwrap();

            if (res?.code === 200) {
                toast.success(res?.message || 'Subscription Rejected');
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const handleCancelViseRequesst = async (id) => {

        try {
            const res = await cancelViseRequest({ id }).unwrap();
            console.log(res)
            if (res?.code === 200) {
                toast.success(res?.message || 'Vise Request Cancelled');
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }

    }


    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="space-y-6">
            <div className='flex items-center justify-between'>
                <h3 className="text-2xl font-semibold">
                    Vise Subscription Requests
                </h3>
                <select className='border rounded-lg border-[#bbb] py-2 px-10 ' onChange={(e) => setStatus(e.target.value)} defaultValue={'pending'} name="" id="">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

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
                        {allViseSubRequest.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No requests found
                                </td>
                            </tr>
                        )}

                        {allViseSubRequest.map((item) => (
                            <tr
                                key={item._RequestForViseSubscriptionToAdminId}
                                className="border-t hover:bg-gray-50"
                            >
                                {/* Patient */}
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <img
                                        src={
                                            item.patientId?.profileImage?.imageUrl?.includes(
                                                'amazonaws'
                                            )
                                                ? item.patientId.profileImage.imageUrl
                                                : url +
                                                item.patientId.profileImage.imageUrl
                                        }
                                        alt=""
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {item.patientId?.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.patientId?.email}
                                        </p>
                                    </div>
                                </td>

                                {/* Subscription */}
                                <td className="px-4 py-3 capitalize">
                                    {item.patientId?.subscriptionType}
                                </td>

                                {/* Date */}
                                <td className="px-4 py-3">
                                    {moment(item.createdAt).format('lll')}
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full capitalize text-xs font-semibold
                                            ${item.status === 'approved'
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
                                            className="py-2 px-3 rounded bg-[#089920] cursor-pointer text-[#fff] hover:bg-green-600"
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
                                            className="py-2 px-3 rounded bg-[#FFC107] cursor-pointer text-[#fff] hover:bg-yellow-600"
                                            disabled={item.status !== 'pending'}
                                            onClick={() =>
                                                handleDecline(
                                                    item._RequestForViseSubscriptionToAdminId
                                                )
                                            }
                                        >
                                            <CloseOutlined />
                                        </button>
                                        {
                                            item.status === 'approved' &&
                                            <button className="py-2 px-5 rounded bg-[#e91f1f] text-[#fff]  " onClick={() => handleCancelViseRequesst(item._RequestForViseSubscriptionToAdminId)}>Cancel</button>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


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
                                        ${page === pageNumber
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
                                ${page === totalPages
                                ? 'bg-gray-100 text-[gray] cursor-not-allowed'
                                : 'hover:bg-gray-100'
                            }
                            `}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ViseSubRequest;
