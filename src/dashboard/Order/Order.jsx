import React from 'react';
import { IoEyeOutline } from 'react-icons/io5';

const Order = () => {
  const orders = [
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Processing' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Delivered' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Processing' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Processing' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Delivered' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Processing' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Delivered' },
    { id: 1231, type: 'Product', userId: 1234567, transactionId: 1234567, payment: 'Online', amount: '$123', status: 'Delivered' },
  ];

  return (
    <div className="p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-red-700 text-white text-left">
              <th className="py-3 px-4 text-sm font-semibold">#Order id</th>
              <th className="py-3 px-4 text-sm font-semibold">Order Type</th>
              <th className="py-3 px-4 text-sm font-semibold">User Id</th>
              <th className="py-3 px-4 text-sm font-semibold">Transaction Id</th>
              <th className="py-3 px-4 text-sm font-semibold">Payment Method</th>
              <th className="py-3 px-4 text-sm font-semibold">Total Amount</th>
              <th className="py-3 px-4 text-sm font-semibold">Status</th>
              <th className="py-3 px-4 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700 text-sm">{order.id}</td>
                <td className="py-3 px-4 text-gray-700 text-sm">{order.type}</td>
                <td className="py-3 px-4 text-gray-700 text-sm">{order.userId}</td>
                <td className="py-3 px-4 text-gray-700 text-sm">{order.transactionId}</td>
                <td className="py-3 px-4 text-gray-700 text-sm">{order.payment}</td>
                <td className="py-3 px-4 text-gray-700 text-sm">{order.amount}</td>
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
                <td className="py-3 px-4 text-center">
                  <IoEyeOutline className="w-5 h-5 text-black cursor-pointer inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
