import { useState } from 'react';
import React from 'react';
import { FaCalendarCheck, FaCogs, FaBoxOpen, FaUser, FaMoneyCheckAlt, FaHeartbeat, FaCreditCard, FaUserPlus, FaExclamationTriangle } from 'react-icons/fa';
import { useGetNotificationQuery } from '../../../redux/features/notificaiton/notification';
import moment from 'moment';

const Notifications = ({ notification }) => {
     // Dynamic styles and icons based on notification type
     const getNotificationStyle = (type) => {
          switch (type) {
               case 'appointmentBooking':
                    return { style: 'bg-[#e0f7fa] border-[#00acc1] text-[#00796b]', icon: <FaCalendarCheck /> };
               case 'trainingProgramPurchase':
                    return { style: 'bg-[#fff9c4] border-[#fbc02d] text-[#f57f17]', icon: <FaCogs /> };
               case 'workoutClassPurchase':
                    return { style: 'bg-[#c8e6c9] border-[#388e3c] text-[#2e7d32]', icon: <FaBoxOpen /> };
               case 'productOrder':
                    return { style: 'bg-[#e8eaf6] border-[#3f51b5] text-[#283593]', icon: <FaBoxOpen /> };
               case 'labTestBooking':
                    return { style: 'bg-[#b2dfdb] border-[#00796b] text-[#004d40]', icon: <FaHeartbeat /> };
               case 'withdrawal':
                    return { style: 'bg-[#ffcdd2] border-[#d32f2f] text-[#c62828]', icon: <FaMoneyCheckAlt /> };
               case 'payment':
                    return { style: 'bg-[#f8bbd0] border-[#d81b60] text-[#c2185b]', icon: <FaCreditCard /> };
               case 'system':
                    return { style: 'bg-[#f3e5f5] border-[#8e24aa] text-[#6a1b9a]', icon: <FaCogs /> };
               case 'newUser':
                    return { style: 'bg-[#c8e6c9] border-[#388e3c] text-[#1b5e20]', icon: <FaUserPlus /> };
               default:
                    return { style: 'bg-[#f1f1f1] border-[#9e9e9e] text-[#616161]', icon: <FaExclamationTriangle /> };
          }

     };

     const { style, icon } = getNotificationStyle(notification?.type);

     return (
          <div className={`border-l-4 p-4 mb-3 rounded-lg flex justify-between items-center ${style}`}>
               <div className="flex items-center gap-3">
                    <div className="text-2xl md:text-3xl">{icon}</div>
                    <div>
                         <p>{notification?.title}</p>
                         <span className='text-xs font-semibold'>{moment(notification?.createdAt).format('lll')}</span>
                    </div>
               </div>
          </div>
     );
};

const Notification = () => {
     const [page, setPage] = useState(1);

     const { data, isLoading, error } = useGetNotificationQuery(page);
     console.log(data);

     const subscription = data?.data?.attributes?.results || [];
     const totalPages = data?.data?.attributes?.totalPages || 1;

     // Handle the 'Next' and 'Previous' page changes
     const handleNextPage = () => {
          if (page < totalPages) {
               setPage(page + 1);
          }
     };

     const handlePrevPage = () => {
          if (page > 1) {
               setPage(page - 1);
          }
     };

     return (
          <div className="mx-auto py-6">
               <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

               {/* Loader */}
               {isLoading && <p>Loading...</p>}
               {error && <p className="text-red-600">Error loading notifications</p>}

               {/* Notifications List */}
               {subscription.length > 0 ? (
                    subscription.map((notification) => (
                         <Notifications
                              key={notification.id}
                              notification={notification}
                         />
                    ))
               ) : (
                    <p className="text-gray-600">No notifications available.</p>
               )}

               {/* Pagination Controls */}
               <div className="flex justify-end items-center gap-2 mt-5">
                    <button
                         onClick={handlePrevPage}
                         disabled={page === 1}
                         className="px-4 py-2 bg-[#eee] text-gray-700 rounded-lg disabled:bg-gray-200"
                    >
                         Previous
                    </button>
                    <span className="text-sm font-semibold text-gray-600">
                         Page {page} of {totalPages}
                    </span>
                    <button
                         onClick={handleNextPage}
                         disabled={page === totalPages}
                         className="px-4 py-2 bg-[#eee] text-gray-700 rounded-lg disabled:bg-gray-200"
                    >
                         Next
                    </button>
               </div>
          </div>
     );
};

export default Notification;
