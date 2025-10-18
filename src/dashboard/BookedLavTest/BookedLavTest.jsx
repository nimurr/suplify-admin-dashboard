import React, { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { Modal, Button } from 'antd';
import { useGetBookedLavTestQuery } from '../../redux/features/BookedLavTest/BookedLavTest';


const BookedLavTest = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);

    const { data, isLoading } = useGetBookedLavTestQuery()
    console.log(data);

    const labTests = [
        { id: 1231, testName: 'Product', date: '2021-12-01', address: 'Online', transactionId: '1234567', paymentStatus: '$123', bookingStatus: 'Processing', city: 'New York', state: 'NY', zipCode: '10001', startTime: '10:00 AM', endTime: '11:00 AM' },
        { id: 1232, testName: 'Product', date: '2021-12-02', address: 'Online', transactionId: '1234568', paymentStatus: '$123', bookingStatus: 'Delivered', city: 'Los Angeles', state: 'CA', zipCode: '90001', startTime: '12:00 PM', endTime: '01:00 PM' },
        // Add more test data as needed
    ];

    const showModal = (test) => {
        setSelectedTest(test);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTest(null);
    };

    return (
        <div >
            <h1 className="text-xl font-semibold mb-6">Booked Lab Test</h1>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-[#d10000] text-primaryBg">
                        <tr>
                            <th className="py-3 px-4 text-sm font-semibold">#Latest Booking id</th>
                            <th className="py-3 px-4 text-sm font-semibold">Test Name</th>
                            <th className="py-3 px-4 text-sm font-semibold">Date</th>
                            <th className="py-3 px-4 text-sm font-semibold">Address</th>
                            <th className="py-3 px-4 text-sm font-semibold">Transaction Id</th>
                            <th className="py-3 px-4 text-sm font-semibold">Payment</th>
                            <th className="py-3 px-4 text-sm font-semibold">Booking Status</th>
                            <th className="py-3 px-4 text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {labTests.map((test, index) => (
                            <tr key={index} className="border-b border-[#ececec] hover:bg-[#fff4f4]">
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.id}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.testName}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.date}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.address}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.transactionId}</td>
                                <td className="py-3 px-4 text-gray-700 text-sm">{test.paymentStatus}</td>
                                <td className="py-3 px-4 text-sm font-medium">
                                    <span
                                        className={
                                            test.bookingStatus === 'Delivered'
                                                ? 'text-green-600'
                                                : 'text-orange-500'
                                        }
                                    >
                                        {test.bookingStatus}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <IoEyeOutline
                                        onClick={() => showModal(test)}
                                        className="w-5 h-5 text-black cursor-pointer inline"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Test Details */}
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                {selectedTest && (
                    <div className='mt-8'>
                        <div className="mb-4 space-y-3">
                            <div className='space-y-2 '>
                                <p className='flex items-center gap-2 justify-between'><strong>Lab test booking ID:</strong> {selectedTest.id}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>Test name:</strong> {selectedTest.testName}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>Appointment date:</strong> {selectedTest.date}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>Start time:</strong> {selectedTest.startTime}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>End time:</strong> {selectedTest.endTime}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>Address:</strong> {selectedTest.address}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>City:</strong> {selectedTest.city}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>State:</strong> {selectedTest.state}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>Zip code:</strong> {selectedTest.zipCode}</p>
                                <p className='flex items-center gap-2 justify-between'><strong>Transaction ID:</strong> {selectedTest.transactionId}</p>
                            </div>

                            <div className='flex items-start gap-5'>
                                <Button type="dashed" danger>
                                    Booking Status
                                </Button>
                                <Button type="dashed" danger>
                                    Payment Status
                                </Button>
                                <select className='border border-[#eee] bg-[#e88c31] text-primaryBg outline-none focus:right-0 px-8 py-1.5 rounded-lg' name="" id="">
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BookedLavTest;