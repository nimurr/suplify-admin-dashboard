// import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
// import { BsInfoCircle } from "react-icons/bs";
// import { useState } from "react";
// import users from './../../../../public/image/users.jpg'
// import { CloseOutlined } from "@ant-design/icons";
// import styles from './style.module.css'
 
// const { Search } = Input;
 
// const dataSource = [
//     {
//       key: '1',
      
//       customerName: 'Bashar Islam',
//       email: 'abc@email.com',
//       address: 'Dhaka Bangladesh',
//       date: '16 Apr 2024',
//       phone:'4536656'
//     },
//     {
//       key: '2',
//       applicationId: '12345678',
//       customerName: 'Bashar Islam',
//       email: 'abc@email.com',
//       address: 'Dhaka Bangladesh',
//       date: '16 Apr 2024',
//       phone:'4536656'
//     },
//     {
//       key: '3',
//       applicationId: '12345678',
//       customerName: 'Bashar Islam',
//       email: 'abc@email.com',
//       address: 'Dhaka Bangladesh',
//       date: '16 Apr 2024',
//       phone:'4536656'
//     },
// ]
// const User = () => {
 
//     const [isModalOpen, setIsModalOpen] = useState(false);

 
// // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
 
//   const columns = [
//     {
//       title: "#SI",
//       dataIndex: "si",
//       key: "si",
//       render: (text,_,index) => index + 1,
//     },
//     {
//       title: "User Name",
//       dataIndex: "name",
//       key: "name",
//       render: (_, record) => (
//         <div className="flex gap-2 items-center">
           
//           <p className="font-medium">Absayed</p>
//         </div>
//       ),
//     },
   
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       render: (_, record) => (
//         <p>{(record?.email) ?  record?.email : "Apple Or Facebook User"}</p>
//       )
//     },
//     {
//       title: 'Phone',
//       dataIndex: 'phone',
//       key: 'phone',
//     },
//     {
//       title: "Date",
//       key: "date",
//       dataIndex: "date",
//       render: (_, record) => (
//         // <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
//         <p>34/04/24</p>
//       )
//     },
    
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
         
//            <button onClick={() => Navigate('')} className=" text-[#4096FF]">view</button>
          
//           {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
//         </Space>
//       ),
//     },
//   ];
  
//   const handleView = () => {
//     // setUser(value);
//     // console.log(value)
//     setIsModalOpen(true);
//   };
// //   const onChange = (date, dateString) => {
// //     console.log(date, dateString);
// //   };
// //   console.log(user);
// //   const handleChangePage = (page) => {
// //     setCurrentPage(page);
// //     console.log(page);
// //   };
// const onSearch = (value, _e, info) => console.log(info?.source, value);
// const onChange = (date, dateString) => {
//   console.log(date, dateString);
// };
//   return (
//     <div className="">
       
//       <div className="rounded-t-lg mt-[24px]">
//         <div className="flex py-[22px] justify-between items-center">
//           <div>

//           <p className="text-header">Agency</p>
//           </div>
          
//           <div>
//           <Space direction="vertical">
//     <DatePicker onChange={onChange} />
   
//   </Space>
//           <Search style={{
//             width:"200px",
//             marginLeft:'4px'
//           }} placeholder="input search text" onSearch={onSearch} enterButton />
//           </div>
//         </div>
//         <Table
//        pagination={{
//         total: dataSource.length,
//         showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
//         defaultPageSize: 2,
//         showSizeChanger: false,
//         itemRender: (current, type, originalElement) => {
//           if (type === 'prev') {
//             return <Button className={styles.paginationButton}>Back</Button>;
//           }
//           if (type === 'next') {
//             return <Button className={styles.paginationButton}>Next</Button>;
//           }
//           return originalElement;
//         },
//         className: styles.paginationCenter,
//       }}
//           columns={columns}
//           dataSource={dataSource}
//           className={styles.customTable}
//           // Add this line to style the table headers
//           components={{
//             header: {
//               cell: props => <th {...props} className={styles.tableHeader} />
//             }
//           }}
//         />
//       </div>
//       <Modal
//         open={isModalOpen}
//         onOk={() => setIsModalOpen(false)}
//         onCancel={() => setIsModalOpen(false)}
//         footer={[]}
//         closeIcon={
//           <CloseOutlined
//             style={{
//               color: "white", // Icon color
//               backgroundColor: "#de0a26", // Background color of the close icon
//               borderRadius: "10%", // Rounded background
//               padding: "10px", // Padding inside the background
//             }}
//           />
//         }
//       >
     
//       <div>
//         <div  className="flex justify-center py-4 items-center gap-2 flex-col border-b border-b-gray-300">
//            <h1 className="text-xl font-medium">Agency Details</h1>
//         </div>
//         <div className="p-[20px]">
//         <div className="flex justify-between border-b py-[16px]">
//             <p>Full Name:</p>
//             <p>
//               {/* {user?.name ? user?.name : "N/A"} */}
//               absayed
//             </p>
//           </div>
        
         
//           <div className="flex justify-between border-b py-[16px] ">
//             <p>Email:</p>
//             <p>
//               {/* {user?.email ? user?.email : "N/A"} */}
//               ab@gmail.com
//             </p>
//           </div>
//           <div className="flex justify-between border-b py-[16px]">
//             <p>Phone:</p>
//             <p>
//               {/* {user?.phone ? user?.phone : "N/A"} */}
//               +45269875
//             </p>
//           </div>
//           <div className="flex justify-between border-b py-[16px]">
//             <p>Date:</p>
//             <p>
//               {/* {user?.createdAt  ? user?.createdAt?.split("T")[0] : "N/A"} */}
//               23-11-24
//             </p>
//           </div>
//           <div className="flex justify-between items-center pt-[16px]">
//             <p>address:</p>
//             <p className="px-[15px] py-[10px] rounded-lg">
//               {/* Regular P550 */}
//               UK
//             </p>
//           </div>

//         </div>
//       </div>
//       </Modal>
//     </div>
//   );
// };

// export default User;


import React, { useState } from 'react';
import { Table, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const initialData = [
  {
    key: '1',
    id: '01',
    name: 'Sakib Ahmed',
    email: 'sakibahmed@gmail.com',
    role: 'Doctor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    key: '2',
    id: '02',
    name: 'Fuad Ahmed',
    email: 'fuad@gmail.com',
    role: 'Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    key: '3',
    id: '03',
    name: 'Mahmud',
    email: 'mahmud.uiuxdesign@gmail.com',
    role: 'Member',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    key: '4',
    id: '04',
    name: 'Sakib Ahmed',
    email: 'sakibahmed@gmail.com',
    role: 'Doctor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

const UserManagement = () => {
  const [data] = useState(initialData);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
  });

  const [sortedInfo, setSortedInfo] = useState({
    columnKey: 'role',
    order: 'ascend',
  });

  const handleChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.avatar} size={32} style={{ marginRight: 8 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortOrder: sortedInfo.columnKey === 'role' ? sortedInfo.order : null,
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`view-user`} rel="noopener noreferrer">
          View
        </Link>
      ),
      width: 100,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data.length,
        showSizeChanger: false,
      }}
      onChange={handleChange}
      rowKey="key"
      bordered
    />
  );
};

export default UserManagement;
