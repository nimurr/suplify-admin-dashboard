import React, { useState } from 'react';
import { Modal, Button, Tabs, Card, Select, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const ViewProfileSpecialist = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);

    const specialists = [
        { id: 1, name: "Sakib Ahmed" },
        { id: 2, name: "John Doe" },
        { id: 3, name: "Jane Smith" },
        // Add more specialists here
    ];

    const handleAssignSpecialist = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Logic to assign the selected specialist
        console.log('Assigned specialist:', selectedSpecialist);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='flex gap-5 items-start'>
            {/* Tabs */}
            <div className='min-w-[250px] md:min-w-[300px] border border-[#eee] rounded-xl p-3 relative'>
                <span className='px-4 py-2 bg-[#d30808] absolute top-5 rounded-lg text-primaryBg font-semibold right-5 text-white'>Vise</span>
                <img className='w-full rounded-xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbzZurv0Bg_50ttI_Yp5IalJCvKguLnL_7YRFFB5LgrhUM65Us21QZKjnfMJ1At2k03Og" alt="" />
                <div className='p-2 text-center mt-2'>
                    <h2 className='font-semibold'>Sakib Ahmed</h2>
                    <p>abusyedvy@gmail.com</p>
                </div>
            </div>
            <Tabs defaultActiveKey="1" className='w-full'>
                <TabPane tab="Your Specialists" key="1">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <Card
                            style={{ width: 250 }}
                            cover={<img alt="specialist" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbzZurv0Bg_50ttI_Yp5IalJCvKguLnL_7YRFFB5LgrhUM65Us21QZKjnfMJ1At2k03Og" />}
                        >
                            <Card.Meta title="Sakib Ahmed" description="Doctor" />
                            <p>Description for this item is very important for the user...</p>
                            <p>Protocol Name +2</p>
                        </Card>
                        <Card
                            style={{ width: 250 }}
                            cover={<img alt="specialist" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbzZurv0Bg_50ttI_Yp5IalJCvKguLnL_7YRFFB5LgrhUM65Us21QZKjnfMJ1At2k03Og" />}
                        >
                            <Card.Meta title="John Doe" description="Doctor" />
                            <p>Description for this item is very important for the user...</p>
                            <p>Protocol Name +2</p>
                        </Card>
                        {/* Add more specialists as needed */}
                    </div>
                </TabPane>
                <TabPane tab="Doctor" key="2">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <Card
                            style={{ width: 250 }}
                            cover={<img alt="doctor" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbzZurv0Bg_50ttI_Yp5IalJCvKguLnL_7YRFFB5LgrhUM65Us21QZKjnfMJ1At2k03Og" />}
                        >
                            <Card.Meta title="Sakib Ahmed" description="Doctor" />
                            <p>Description for this item is very important for the user...</p>
                            <p>Protocol Name +2</p>
                        </Card>
                        {/* Add more doctor profiles as needed */}
                    </div>
                </TabPane>
            </Tabs>


            {/* Assign New Specialist Button */}
            <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={handleAssignSpecialist}
                className='h-14 px-8 bg-[#b80707] hover:!bg-[#d30808] text-white rounded-lg flex items-center gap-2'
            >
                Assign New Specialist
            </Button>

            {/* Modal to Select Specialist */}
            <Modal
                title="Assign New Specialist"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Select
                        placeholder="Select a specialist"
                        onChange={(value) => setSelectedSpecialist(value)}
                        value={selectedSpecialist}
                        className='w-full h-10 my-5'
                    >
                        {specialists.map((specialist) => (
                            <Select.Option key={specialist.id} value={specialist.name}>
                                {specialist.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </Modal>
        </div>
    );
};

export default ViewProfileSpecialist;
