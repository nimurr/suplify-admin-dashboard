import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, useUpdateStatusMutation } from '../../redux/features/Order/order';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

const OrderDetails = () => {
    const { id } = useParams();
    const { data } = useGetOrderDetailsQuery(id);
    const fullData = data?.data?.attributes;
    console.log(fullData);

    const [updateStaus] = useUpdateStatusMutation();


    const handleUpdateStatus = async (status) => {
        console.log(status.target.value);

        const data = {
            status: status.target.value
        }
        try {

            const res = await updateStaus({ id, data }).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message || 'Status Updated Successfully');
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong');
        }

    }

    return (
        <div >
            <Toaster />
            <div className="space-y-5 capitalize">
                {/* Products Table */}
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-[#c50808] text-primaryBg">
                            <tr>
                                <th className="py-3 px-4 text-sm font-semibold">Name & Image</th>
                                <th className="py-3 px-4 text-sm font-semibold">Product Id</th>
                                <th className="py-3 px-4 text-sm font-semibold">Order Id</th>
                                <th className="py-3 px-4 text-sm font-semibold">Unit Price</th>
                                <th className="py-3 px-4 text-sm font-semibold">Quantity</th>
                                <th className="py-3 px-4 text-sm font-semibold">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {fullData?.result?.map((product, index) => (
                                <tr key={index} className=" hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700 text-sm">
                                        <img className='w-16 h-16' src={product.itemId?.attachments[0]?.attachment} alt="" />
                                        <span className='font-semibold'> {product.itemId?.name}</span>
                                    </td>


                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product._id}</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.orderId}</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.unitPrice}$</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.quantity}</td>
                                    <td className="py-3 text-center px-4 text-gray-700 text-sm">{product.totalPrice}$</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Billing Address */}
                <div className="bg-white mt-5 rounded-lg flex items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Billing Address</h3>
                        <p className="text-sm text-gray-600">Address: {fullData?.orderInfo?.shippingAddress?.address || "--"}</p>
                        <p className="text-sm text-gray-600">City: {fullData?.orderInfo?.shippingAddress?.city || "--"}</p>
                        <p className="text-sm text-gray-600">State: {fullData?.orderInfo?.shippingAddress?.state || "--"}</p>
                        <p className="text-sm text-gray-600">Zip Code: {fullData?.orderInfo?.shippingAddress?.zipCode || "--"}</p>
                    </div>

                    <div className="mt-6 bg-[#c508082a]  p-4 rounded-lg text-sm text-orange-600 flex items-start">
                        <div>
                            <p className="font-semibold">Tnx Id: {fullData?.orderInfo?.paymentTransactionId}</p>
                            <p>User Id: {fullData?.orderInfo?.userId._id}</p>
                            <p>Final Amount: {fullData?.orderInfo?.finalAmount}$</p>
                            <p className='capitalize'>Payment Status: {fullData?.orderInfo?.paymentStatus}</p>
                            <br />
                            <p>Name: {fullData?.orderInfo?.userId.name}</p>
                            <p>Address:  {fullData?.orderInfo?.shippingAddress?.address + fullData?.orderInfo?.shippingAddress?.city}</p>
                            <p>Create Date: {fullData?.orderInfo?.createdAt && moment(fullData?.orderInfo?.createdAt).format("dddd, MMMM Do YYYY") || "--"}</p>
                        </div>
                        <p className="space-x-2 ">
                            {/* // pending-processing-confirmed-completed */}
                            <select defaultValue={fullData?.orderInfo?.status} onChange={handleUpdateStatus} className='rounded-lg capitalize bg-[#e88c31] cursor-pointer px-2 py-1 ml-2' name="" id="">
                                <option className='cursor-pointer' value="pending">pending</option>
                                <option className='cursor-pointer' value="processing">processing</option>
                                <option className='cursor-pointer' value="confirmed">confirmed</option>
                                <option className='cursor-pointer' value="completed">completed</option>
                            </select>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;